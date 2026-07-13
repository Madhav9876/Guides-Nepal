from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.guide import Guide
from app.schemas.public import ExperienceResponse, GuideResponse
from app.services.guide_service import GuideService

router = APIRouter()

# Mock Data to match frontend types exactly
MOCK_GUIDES = [
    {
        "id": 1,
        "name": "Ram Bahadur",
        "image": "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20guide%20portrait&image_size=square",
        "role": "Cultural Expert",
        "rating": 4.9,
        "reviews": 120,
        "bio": "Expert in Kathmandu Valley history.",
        "languages": ["English", "Nepali", "Newari"],
        "verified": True,
        "livesIn": "Kathmandu",
        "cities": ["Kathmandu", "Bhaktapur"],
        "gallery": [],
    }
]

MOCK_EXPERIENCES = [
    {
        "id": 1,
        "slug": "bhaktapur-heritage-walk",
        "title": "Bhaktapur Heritage Walk",
        "heroImage": "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bhaktapur%20durbar%20square&image_size=landscape_16_9",
        "description": "Walk through the living museum of Bhaktapur.",
        "price": 50.0,
        "duration": "4 hours",
        "rating": 4.8,
        "reviews": 45,
        "host": MOCK_GUIDES[0],
    }
]


@router.get("/experiences", response_model=List[ExperienceResponse])
def list_experiences(
    city: Optional[str] = None,
    type: Optional[str] = None,
    search: Optional[str] = None,
) -> List[dict]:
    # In real impl, query DB with filters
    return MOCK_EXPERIENCES


@router.get("/experiences/{slug}", response_model=ExperienceResponse)
def get_experience(slug: str) -> dict:
    for exp in MOCK_EXPERIENCES:
        if exp["slug"] == slug:
            return exp
    raise HTTPException(status_code=404, detail="Experience not found")


@router.get("/guides", response_model=List[GuideResponse])
def list_guides(
    city: Optional[str] = None, db: Session = Depends(get_db)
) -> List[Guide]:
    service = GuideService(db)
    return service.get_all_guides(city)


@router.get("/guides/{id}", response_model=GuideResponse)
def get_guide(id: int, db: Session = Depends(get_db)) -> dict:
    service = GuideService(db)
    guide = service.get_guide(id)
    if not guide:
        raise HTTPException(status_code=404, detail="Guide not found")
    return guide
