from sqlalchemy.orm import Session
from app.models.booking import Booking, BookingStatus
from app.schemas.booking import BookingCreate
from typing import List, Optional


class BookingService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_bookings(self, user_id: int) -> List[Booking]:
        return self.db.query(Booking).filter(Booking.user_id == user_id).all()

    def create_booking(self, user_id: int, booking_in: BookingCreate) -> Booking:
        db_booking = Booking(user_id=user_id, **booking_in.model_dump())
        self.db.add(db_booking)
        self.db.commit()
        self.db.refresh(db_booking)
        return db_booking

    def cancel_booking(self, user_id: int, booking_id: int) -> Optional[Booking]:
        booking = (
            self.db.query(Booking)
            .filter(Booking.id == booking_id, Booking.user_id == user_id)
            .first()
        )
        if booking:
            booking.status = BookingStatus.cancelled  # type: ignore
            self.db.commit()
            self.db.refresh(booking)
        return booking

    def archive_booking(self, user_id: int, booking_id: int) -> Optional[Booking]:
        booking = (
            self.db.query(Booking)
            .filter(Booking.id == booking_id, Booking.user_id == user_id)
            .first()
        )
        if booking:
            booking.status = BookingStatus.archived  # type: ignore
            self.db.commit()
            self.db.refresh(booking)
        return booking
