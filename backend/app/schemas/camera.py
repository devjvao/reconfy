from typing import Optional

from pydantic import BaseModel


# Shared properties
class CameraBase(BaseModel):
    url: Optional[str] = None
    name: Optional[str] = None


class CameraCreate(CameraBase):
    url: str
    name: str


class CameraUpdate(CameraBase):
    pass


class CameraInDBBase(CameraBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class Camera(CameraInDBBase):
    pass
