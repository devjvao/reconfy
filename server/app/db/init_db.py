from sqlalchemy.orm import Session

from app.schemas import user as user_schemas
from app.crud import crud_user
from app.core.config import settings
from app.db import base  # noqa: F401


def init_db(db: Session) -> None:
    user = crud_user.user.get_by_email(db, email=settings.INITIAL_USER_EMAIL)

    if not user:
        user_in = user_schemas.UserCreate(
            name=settings.INITIAL_USER_NAME,
            email=settings.INITIAL_USER_EMAIL,
            password=settings.INITIAL_USER_PASSWORD,
        )
        user = crud_user.user.create(db, obj_in=user_in)  # noqa: F841
