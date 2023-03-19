from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.util import stream

router = APIRouter()


# noinspection PyUnusedLocal
@router.get("/connect/{camera_id}")
async def stream_camera(
    *,
    db: Session = Depends(deps.get_db),
    camera_id: int,
    # @todo Protect endpoint if there is a way to pass the
    #   token using <video /> html tag
    # current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    camera = crud.camera.get(db, id=camera_id)
    if not camera:
        raise HTTPException(
            status_code=400,
            detail="The camera with this id does not exist in the system.",
        )

    data = stream.load_source(camera.url)

    return StreamingResponse(data, media_type="multipart/x-mixed-replace;boundary=frame")
