"""create bookings table

Revision ID: ff8b527a0b00
Revises: 5da9b06e2e4f
Create Date: 2026-01-24 08:25:54.208651

"""

from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "ff8b527a0b00"
down_revision: Union[str, Sequence[str], None] = "5da9b06e2e4f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
