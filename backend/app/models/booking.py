from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class BookingStatus(str, enum.Enum):
    upcoming = "upcoming"
    completed = "completed"
    cancelled = "cancelled"
    archived = "archived"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    experience_id = Column(Integer, nullable=False)
    experience_title = Column(String, nullable=False)
    city = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    guests = Column(Integer, default=1)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=True)
    status: Column[BookingStatus] = Column(
        Enum(BookingStatus), default=BookingStatus.upcoming
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", backref="bookings")
