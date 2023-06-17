import json
from typing import Any

from fastapi import APIRouter, Depends, WebSocket, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from starlette.websockets import WebSocketDisconnect, WebSocketState

from app import crud
from app.api import deps
from app.util.stream import StreamController, load_source

router = APIRouter()


@router.websocket("/connect/{camera_id}")
async def connect(websocket: WebSocket, camera_id: int) -> None:
    try:
        await websocket.accept()

        controller = StreamController()

        key = controller.add(camera_id, websocket)

        json_payload = json.dumps({
            "key": key,
        })

        await websocket.send_text(json_payload)

        await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()


@router.get("/detect/{key}")
async def detect(
    *,
    db: Session = Depends(deps.get_db),
    key: str,
) -> Any:
    controller = StreamController()

    config = controller.streams[key]
    if not config:
        raise HTTPException(
            status_code=400,
            detail="The key is not valid or the related connection was closed.",
        )

    camera = crud.camera.get(db, id=config['camera_id'])
    if not camera:
        await controller.remove(key)

        raise HTTPException(
            status_code=400,
            detail="The camera with this id does not exist in the system.",
        )

    data = load_source(camera.url, key)

    return StreamingResponse(data, media_type="multipart/x-mixed-replace; boundary=frame")
