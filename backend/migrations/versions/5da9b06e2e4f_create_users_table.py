"""create users table

Revision ID: 5da9b06e2e4f
Revises:
Create Date: 2026-01-24 08:23:18.948071

"""

from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "5da9b06e2e4f"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
