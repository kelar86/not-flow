import json
import asyncio
from uuid import uuid4
from typing import AsyncGenerator

from fastapi import APIRouter, WebSocket, Request
from fastapi.responses import StreamingResponse

from app.api.routes.utils import format_messages
from app.core.crew_ai import load_crew_from_db

router = APIRouter(prefix="/chat", tags=["chat"])
sessions = {}


@router.websocket("/{id}")
async def chat_with_crew(ws: WebSocket, id: int):
    """
    WebSocket endpoint for interactive chat with real-time progress updates from CrewAI.
    """
    await ws.accept()
    session_id = str(uuid4())
    loop = asyncio.get_event_loop()

    # Step callback: emits thoughts from the agent during reasoning
    def make_step_callback(ws: WebSocket, loop: asyncio.AbstractEventLoop):
        def callback(step):
            message = {
                "type": "progress",
                "stage": "thinking",
                "message": getattr(step, "thought", "No thought"),
            }
            asyncio.run_coroutine_threadsafe(ws.send_json(message), loop)
        return callback

    # Task callback: emits intermediate summaries or outputs per task
    def make_task_callback(ws: WebSocket, loop: asyncio.AbstractEventLoop):
        def callback(task_output):
            message = {
                "type": "progress",
                "stage": "task_complete",
                "message": getattr(task_output, "summary", None),
            }
            asyncio.run_coroutine_threadsafe(ws.send_json(message), loop)
        return callback

    # Dynamically load a crew configuration from DB
    crew = await load_crew_from_db(
        id,
        step_callback=make_step_callback(ws, loop),
        task_callback=make_task_callback(ws, loop)
    )
    sessions[session_id] = crew

    await ws.send_json({"type": "info", "message": f"Chat started with Crew {id}"})

    # Expected JSON request body:
    # {
    #   "text": "Why is the sky blue?",          # Required: The user's current message
    #   "messages": [                            # Optional: History of past messages (used for context)
    #     { "role": "user", "content": "Hi" },
    #     { "role": "assistant", "content": "Hello! How can I help you today?" }
    #   ]
    # }

    try:
        while True:
            raw = await ws.receive_json()
            user_input = raw.get("text")

            # Notify that reasoning has started
            await ws.send_json({
                "type": "progress",
                "stage": "start",
                "message": "Starting agent reasoning..."
            })

            # Run crew with the user input
            result = await crew.kickoff_async(inputs={"user_input": user_input})

            # Send final result back
            await ws.send_json({
                "type": "response",
                "stage": "complete",
                "message": result.raw
            })

    except Exception as e:
        await ws.send_json({"type": "error", "message": str(e)})
        await ws.close()


@router.post("/{id}")
async def chat_rest_endpoint(id: int, request: Request):
    """
    REST endpoint for Assistant UI-like chat interfaces, returning a streamed response.
    Expects: { "text": "...", "messages": [...] }
    """
    body = await request.json()
    user_input = body.get("text")
    messages = body.get("messages", [])

    async def streamer() -> AsyncGenerator[str, None]:
        queue: asyncio.Queue = asyncio.Queue()

        # Load crew without callbacks — we'll just send final output
        crew = await load_crew_from_db(id)

        async def run_crew():
            # Format previous chat history to string
            history = format_messages(messages)

            # Run crew with both history and current input
            result = await crew.kickoff_async(inputs={
                "user_input": user_input,
                "chat_history": history
            })

            # Send final answer as assistant delta
            data = {
                "type": "part",
                "delta": {
                    "role": "assistant",
                    "content": result.raw
                }
            }
            await queue.put(data)
            await queue.put(None)

        asyncio.create_task(run_crew())

        while True:
            item = await queue.get()
            if item is None:
                break
            yield f"event: part\ndata: {json.dumps(item)}\n\n"

        yield "event: done\ndata: {}\n\n"

    return StreamingResponse(streamer(), media_type="text/event-stream")
