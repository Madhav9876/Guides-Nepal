from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.booking import BookingCreate, BookingResponse
from app.services.booking_service import BookingService
from app.models.booking import Booking

# Mocking get_current_user dependency for now as full implementation requires JWT decoding logic
# which is partially in core/security.py but needs a reusable dependency function.
# For now we will assume the user is authenticated and ID is 1.


def get_current_user_id() -> int:
    return 1  # Placeholder


router = APIRouter()


@router.get("/", response_model=List[BookingResponse])
def get_bookings(
    db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)
) -> List[Booking]:
    service = BookingService(db)
    return service.get_user_bookings(user_id)


@router.post("/", response_model=BookingResponse)
def create_booking(
    booking_in: BookingCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
) -> Booking:
    service = BookingService(db)
    return service.create_booking(user_id, booking_in)


@router.post("/{id}/cancel", response_model=BookingResponse)
def cancel_booking(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
) -> Booking:
    service = BookingService(db)
    booking = service.cancel_booking(user_id, id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/{id}/archive", response_model=BookingResponse)
def archive_booking(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
) -> Booking:
    service = BookingService(db)
    booking = service.archive_booking(user_id, id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking
