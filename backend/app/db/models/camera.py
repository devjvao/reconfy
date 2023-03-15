from sqlalchemy import Boolean, Column, Integer, String

from app.db.base_class import Base


class Camera(Base):
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    is_active = Column(Boolean(), default=True)
