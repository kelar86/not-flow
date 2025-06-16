from fastapi import FastAPI, WebSocket, APIRouter
from uuid import uuid4
import asyncio

from app.core.crew_ai import load_crew_from_db  # your own loader function

# app = FastAPI()
sessions = {}  # Could use Redis for scalability

router = APIRouter(prefix="/chat", tags=["chat"])


@router.websocket("/{id}")
async def chat_with_crew(ws: WebSocket, id: int):
    await ws.accept()

    # Load and store crew instance per session
    session_id = str(uuid4())
    crew = await load_crew_from_db(id)
    sessions[session_id] = crew

    await ws.send_json({"type": "info", "message": f"Chat started with Crew {id}"})

    try:
        while True:
            # Wait for user message
            raw = await ws.receive_json()
            user_input = raw.get("text")

            # Run the crew with user's message as input
            # result = await crew.kickoff_async(inputs={"user_input": data})
            result = crew.kickoff(inputs={"user_input": user_input})
            for item in result.tasks_output:

                # Return crew's response
                await ws.send_json({
                    "type": "agent_response",
                    "response": item.raw  # or however CrewAI returns final response
                })

    except Exception as e:
        await ws.send_json({"type": "error", "message": str(e)})
        await ws.close()
