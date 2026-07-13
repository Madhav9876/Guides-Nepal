from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import UserCreate
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    validate_password_strength,
)
import secrets


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def register_user(self, user_in: UserCreate) -> User:
        if self.get_user_by_email(user_in.email):
            raise Exception("Email already registered")

        is_valid, error_message = validate_password_strength(user_in.password)
        if not is_valid:
            raise Exception(error_message)

        db_user = User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            firstName=user_in.firstName,
            lastName=user_in.lastName,
            phone=user_in.phone,
            role=user_in.role,
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.get_user_by_email(email)
        if not user:
            return None
        if not user.is_active:
            return None
        if not verify_password(password, str(user.hashed_password)):
            return None
        return user

    def create_tokens(self, user: User) -> dict:
        return {
            "access_token": create_access_token(user.id),
            "refresh_token": create_refresh_token(user.id),
            "token_type": "bearer",  # nosec
            "user": user,
        }

    def upsert_social_user(
        self,
        email: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
    ) -> User:
        user = self.get_user_by_email(email)
        if user:
            if first_name and not user.firstName:
                setattr(user, "firstName", first_name)
            if last_name and not user.lastName:
                setattr(user, "lastName", last_name)
            self.db.commit()
            self.db.refresh(user)
            return user
        # Create a new user with a random password (OAuth users don't use local password)
        random_password = secrets.token_urlsafe(16)
        db_user = User(
            email=email,
            hashed_password=get_password_hash(random_password),
            firstName=first_name or "",
            lastName=last_name or "",
            role="traveler",
            is_active=True,
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
