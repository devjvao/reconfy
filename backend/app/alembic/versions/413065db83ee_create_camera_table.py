"""create camera table

Revision ID: 413065db83ee
Revises: 8ba7f9d10338
Create Date: 2023-03-12 19:18:53.687392

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '413065db83ee'
down_revision = '8ba7f9d10338'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'camera',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('url', sa.String(255), nullable=False),
        sa.Column('name', sa.String(50), nullable=False),
    )
    op.create_index(op.f("ix_camera_url"), "camera", ["url"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_camera_url"), table_name="camera")
    op.drop_table('camera')
