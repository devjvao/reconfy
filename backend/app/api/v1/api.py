from fastapi import APIRouter

from app.api.v1.endpoints import login, users, cameras, stream

api_router = APIRouter()

api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(cameras.router, prefix="/cameras", tags=["cameras"])
api_router.include_router(stream.router, prefix="/stream", tags=["stream"])
