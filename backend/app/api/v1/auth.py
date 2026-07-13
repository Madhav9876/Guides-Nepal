from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse, JSONResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import UserCreate, UserLogin, Token
from app.services.auth_service import AuthService
from app.core.config import settings
import httpx
import urllib.parse

router = APIRouter()


@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)) -> dict:
    auth_service = AuthService(db)
    user = auth_service.register_user(user_in)
    return auth_service.create_tokens(user)


@router.post("/seed-admin", response_model=Token)
def seed_admin(db: Session = Depends(get_db)) -> dict:
    if not settings.DEV_ALLOW_SEED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Seeding disabled"
        )
    email = settings.DEV_SEED_ADMIN_EMAIL
    password = settings.DEV_SEED_ADMIN_PASSWORD
    if not email or not password:
        raise HTTPException(status_code=400, detail="Seed credentials not set")
    auth_service = AuthService(db)
    existing = auth_service.get_user_by_email(email)
    if not existing:
        user_in = UserCreate(
            email=email,
            password=password,
            role="admin",
            firstName="Admin",
            lastName="User",
        )
        user = auth_service.register_user(user_in)
        return auth_service.create_tokens(user)
    return auth_service.create_tokens(existing)


@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)) -> dict:
    auth_service = AuthService(db)
    user = auth_service.authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return auth_service.create_tokens(user)


# --- OAuth: Google ---
@router.get("/oauth/google/start")
def oauth_google_start() -> RedirectResponse:
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_REDIRECT_URI:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode(
        params
    )
    return RedirectResponse(url)


@router.get("/oauth/google/callback", response_model=None)
async def oauth_google_callback(
    code: str, db: Session = Depends(get_db)
) -> JSONResponse | RedirectResponse:
    if (
        not settings.GOOGLE_CLIENT_ID
        or not settings.GOOGLE_CLIENT_SECRET
        or not settings.GOOGLE_REDIRECT_URI
    ):
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
    async with httpx.AsyncClient(timeout=10.0) as client:
        token_resp = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        if token_resp.status_code != 200:
            raise HTTPException(
                status_code=400, detail="Failed to exchange Google code"
            )
        token_data = token_resp.json()
        access_token = token_data.get("access_token")
        if not access_token:
            raise HTTPException(status_code=400, detail="Google access token missing")
        userinfo_resp = await client.get(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if userinfo_resp.status_code != 200:
            raise HTTPException(
                status_code=400, detail="Failed to fetch Google userinfo"
            )
        info = userinfo_resp.json()
        email = info.get("email")
        first_name = info.get("given_name")
        last_name = info.get("family_name")
        if not email:
            raise HTTPException(
                status_code=400, detail="Google user email not available"
            )
    auth_service = AuthService(db)
    user = auth_service.upsert_social_user(
        email=email, first_name=first_name, last_name=last_name
    )
    tokens = auth_service.create_tokens(user)
    # Redirect to frontend with tokens in query (MVP approach)
    if settings.FRONTEND_OAUTH_REDIRECT:
        params = urllib.parse.urlencode(
            {
                "access_token": tokens["access_token"],
                "refresh_token": tokens["refresh_token"],
                "email": user.email,
            }
        )
        return RedirectResponse(f"{settings.FRONTEND_OAUTH_REDIRECT}?{params}")
    return JSONResponse(tokens)


# --- OAuth: Facebook ---
@router.get("/oauth/facebook/start")
def oauth_facebook_start() -> RedirectResponse:
    if not settings.FACEBOOK_CLIENT_ID or not settings.FACEBOOK_REDIRECT_URI:
        raise HTTPException(status_code=500, detail="Facebook OAuth not configured")
    params = {
        "client_id": settings.FACEBOOK_CLIENT_ID,
        "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
        "response_type": "code",
        "scope": "email,public_profile",
    }
    url = "https://www.facebook.com/v17.0/dialog/oauth?" + urllib.parse.urlencode(
        params
    )
    return RedirectResponse(url)


@router.get("/oauth/facebook/callback", response_model=None)
async def oauth_facebook_callback(
    code: str, db: Session = Depends(get_db)
) -> JSONResponse | RedirectResponse:
    if (
        not settings.FACEBOOK_CLIENT_ID
        or not settings.FACEBOOK_CLIENT_SECRET
        or not settings.FACEBOOK_REDIRECT_URI
    ):
        raise HTTPException(status_code=500, detail="Facebook OAuth not configured")
    async with httpx.AsyncClient(timeout=10.0) as client:
        token_resp = await client.get(
            "https://graph.facebook.com/v17.0/oauth/access_token",
            params={
                "client_id": settings.FACEBOOK_CLIENT_ID,
                "client_secret": settings.FACEBOOK_CLIENT_SECRET,
                "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
                "code": code,
            },
        )
        if token_resp.status_code != 200:
            raise HTTPException(
                status_code=400, detail="Failed to exchange Facebook code"
            )
        access_token = token_resp.json().get("access_token")
        if not access_token:
            raise HTTPException(status_code=400, detail="Facebook access token missing")
        userinfo_resp = await client.get(
            "https://graph.facebook.com/me",
            params={"fields": "id,name,email"},
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if userinfo_resp.status_code != 200:
            raise HTTPException(
                status_code=400, detail="Failed to fetch Facebook userinfo"
            )
        info = userinfo_resp.json()
        email = info.get("email")
        full_name = info.get("name") or ""
        first_name, last_name = None, None
        if full_name:
            parts = full_name.split(" ")
            first_name = parts[0]
            last_name = " ".join(parts[1:]) if len(parts) > 1 else ""
        if not email:
            raise HTTPException(
                status_code=400, detail="Facebook user email not available"
            )
    auth_service = AuthService(db)
    user = auth_service.upsert_social_user(
        email=email, first_name=first_name, last_name=last_name
    )
    tokens = auth_service.create_tokens(user)
    if settings.FRONTEND_OAUTH_REDIRECT:
        params = urllib.parse.urlencode(
            {
                "access_token": tokens["access_token"],
                "refresh_token": tokens["refresh_token"],
                "email": user.email,
            }
        )
        return RedirectResponse(f"{settings.FRONTEND_OAUTH_REDIRECT}?{params}")
    return JSONResponse(tokens)
