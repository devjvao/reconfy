from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.db import models

router = APIRouter()


# noinspection PyUnusedLocal
@router.get("", response_model=List[schemas.Camera])
def read_cameras(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Retrieve cameras.
    """
    return crud.camera.get_multi(db, skip=skip, limit=limit)


# noinspection PyUnusedLocal
@router.post("", response_model=schemas.Camera)
def create_camera(
    *,
    db: Session = Depends(deps.get_db),
    camera_in: schemas.CameraCreate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new camera.
    """
    camera = crud.camera.get_by_url(db, url=camera_in.url)
    if camera:
        raise HTTPException(
            status_code=409,
            detail="The camera with this url already exists in the system.",
        )
    return crud.camera.create(db, obj_in=camera_in)


# noinspection PyUnusedLocal
@router.put("/{camera_id}", response_model=schemas.Camera)
def update_camera(
    *,
    db: Session = Depends(deps.get_db),
    camera_id: int,
    camera_in: schemas.CameraUpdate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Update a camera.
    """
    camera = crud.camera.get(db, id=camera_id)
    if not camera:
        raise HTTPException(
            status_code=400,
            detail="The camera with this id does not exist in the system.",
        )

    if camera.url != camera_in.url:
        camera_by_url = crud.camera.get_by_url(db, url=camera_in.url)
        if camera_by_url:
            raise HTTPException(
                status_code=409,
                detail="The camera with this url already exists in the system.",
            )

    return crud.camera.update(db, db_obj=camera, obj_in=camera_in)
