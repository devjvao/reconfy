from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Camera(Base):
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
