"""
End-to-end verification of the sign-in / sign-up auth flow.
Run with:  .venv/Scripts/Activate.ps1 ; python verify_auth.py
"""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from fastapi.testclient import TestClient
from app.main import app
from app.core.database import Base, engine

# Make sure tables exist (mirrors the app's startup create_all)
Base.metadata.create_all(bind=engine)

BASE = "/api/v1/auth"
client = TestClient(app)

results = []


def check(name, condition):
    results.append((name, condition))
    print(f"[{'PASS' if condition else 'FAIL'}] {name}")


# Ensure a clean slate for the test email
import sqlite3

db = sqlite3.connect(os.path.join(os.path.dirname(__file__), "guides_nepal.db"))
db.execute("DELETE FROM users WHERE email IN ('test1@example.com','test2@example.com')")
db.commit()
db.close()

# 1) Sign up a new user
r = client.post(
    f"{BASE}/register",
    json={
        "email": "test1@example.com",
        "password": "Strong@123",
        "firstName": "Test",
        "lastName": "User",
        "phone": "9800000000",
        "role": "traveler",
    },
)
check(
    "Sign up new user returns 200 + tokens",
    r.status_code == 200 and "access_token" in r.json(),
)
check(
    "Sign up returns a user object",
    r.status_code == 200
    and r.json().get("user", {}).get("email") == "test1@example.com",
)

# 2) Sign up with same email again -> rejected (cannot double-register)
r = client.post(
    f"{BASE}/register",
    json={
        "email": "test1@example.com",
        "password": "Strong@123",
        "firstName": "Test",
        "lastName": "User",
        "phone": "9800000000",
    },
)
check("Duplicate email sign-up is rejected (400)", r.status_code == 400)

# 3) Sign up with weak password -> rejected
r = client.post(
    f"{BASE}/register",
    json={
        "email": "weak@example.com",
        "password": "abc",
        "firstName": "Weak",
        "lastName": "Pass",
        "phone": "9800000000",
    },
)
check("Weak password sign-up is rejected (400)", r.status_code == 400)

# 4) Login with CORRECT credentials of the signed-up user -> success
r = client.post(
    f"{BASE}/login",
    json={
        "email": "test1@example.com",
        "password": "Strong@123",
    },
)
check(
    "Signed-up user logs in successfully (200)",
    r.status_code == 200 and "access_token" in r.json(),
)

# 5) Login with WRONG password of a signed-up user -> rejected
r = client.post(
    f"{BASE}/login",
    json={
        "email": "test1@example.com",
        "password": "WrongPass@1",
    },
)
check("Signed-up user with wrong password is rejected (401)", r.status_code == 401)

# 6) Login with an account that was NEVER signed up -> rejected
r = client.post(
    f"{BASE}/login",
    json={
        "email": "nobody@example.com",
        "password": "Whatever@1",
    },
)
check("Never-signed-up user cannot log in (401)", r.status_code == 401)

# 7) Login with malformed email -> rejected by schema
r = client.post(
    f"{BASE}/login",
    json={
        "email": "not-an-email",
        "password": "Whatever@1",
    },
)
check("Malformed email login is rejected (422)", r.status_code == 422)

# 8) The issued access token actually authorizes a protected endpoint
login = client.post(
    f"{BASE}/login",
    json={
        "email": "test1@example.com",
        "password": "Strong@123",
    },
).json()
token = login["access_token"]
r = client.get("/api/v1/profile/me", headers={"Authorization": f"Bearer {token}"})
check("Valid token can access protected profile (200)", r.status_code == 200)

print("\nSummary:", sum(1 for _, c in results if c), "/", len(results), "passed")
if not all(c for _, c in results):
    sys.exit(1)
print("AUTH FLOW VERIFIED: only signed-up users can sign in.")
