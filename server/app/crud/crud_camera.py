from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.db.models.camera import Camera
from app.schemas.camera import CameraCreate, CameraUpdate


class CRUDCamera(CRUDBase[Camera, CameraCreate, CameraUpdate]):
    def get_by_url(self, db: Session, *, url: str) -> Optional[Camera]:
        return db.query(Camera).filter(Camera.url == url).first()


camera = CRUDCamera(Camera)
