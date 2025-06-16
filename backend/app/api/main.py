from fastapi import APIRouter

from app.api.routes import agents, items, login, private, users, utils, chat
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)
api_router.include_router(agents.router)
api_router.include_router(chat.router)

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
