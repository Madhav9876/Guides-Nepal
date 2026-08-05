from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    role: str = "traveler"


class UserCreate(UserBase):
    password: str
    phone: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    isActive: bool = True

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: UserResponse


class ForgotPasswordRequest(BaseModel):
    """Request body for the forgot-password endpoint.

    The endpoint always returns a generic success message regardless of
    whether the email exists, to prevent user enumeration.
    """
    email: EmailStr


class SyncPasswordRequest(BaseModel):
    """Request body for syncing a password reset to the backend database.

    The supabase_access_token is verified against the Supabase API to
    identify the user, ensuring only the account owner can update their
    password.  password is the plaintext new password (validated and
    hashed server-side).
    """
    supabase_access_token: str
    password: str
