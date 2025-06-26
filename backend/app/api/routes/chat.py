import json
from typing import AsyncGenerator

from fastapi import WebSocket, APIRouter, Request
from uuid import uuid4
import asyncio

from fastapi.responses import StreamingResponse

from app.core.crew_ai import load_crew_from_db

router = APIRouter(prefix="/chat", tags=["chat"])
sessions = {}

@router.websocket("/{id}")
async def chat_with_crew(ws: WebSocket, id: int):
    await ws.accept()
    session_id = str(uuid4())
    loop = asyncio.get_event_loop()

    # STEP callback: cognitive thoughts
    def make_step_callback(ws, loop):
        def callback(step):
            message = {
                "type": "progress",
                "stage": "thinking",
                "message": getattr(step, "thought", "No thought"),
            }
            asyncio.run_coroutine_threadsafe(ws.send_json(message), loop)
        return callback

    # TASK callback: partial task output
    def make_task_callback(ws, loop):
        def callback(task_output):
            message = {
                "type": "progress",
                "stage": "task_complete",
                "message": getattr(task_output, "summary", None),
            }
            asyncio.run_coroutine_threadsafe(ws.send_json(message), loop)
        return callback

    # Load crew dynamically
    crew = await load_crew_from_db(
        id,
        step_callback=make_step_callback(ws, loop),
        task_callback=make_task_callback(ws, loop)
    )
    sessions[session_id] = crew

    await ws.send_json({"type": "info", "message": f"Chat started with Crew {id}"})

    # Input: {"type": "user_input", "stage": "start", "text": "Why sky blue?"}
    try:
        while True:
            raw = await ws.receive_json()
            user_input = raw.get("text")

            await ws.send_json({
                "type": "progress",
                "stage": "start",
                "message": "Starting agent reasoning..."
            })
            # Kickoff crew and wait for full result
            result = await crew.kickoff_async(inputs={"user_input": user_input})

            # Finally send full answer at end
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
    body = await request.json()
    user_input = body.get("text")
    messages = body.get("messages", [])

    loop = asyncio.get_event_loop()

    async def streamer() -> AsyncGenerator[str, None]:
        queue = asyncio.Queue()

        # No step_callback or task_callback needed
        crew = await load_crew_from_db(id)

        async def run_crew():
            result = await crew.kickoff_async(inputs={"user_input": user_input})
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

        yield f"event: done\ndata: {{}}\n\n"

    return StreamingResponse(streamer(), media_type="text/event-stream")
