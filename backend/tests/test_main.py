from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_read_root() -> None:
    # We removed the root endpoint "/" in main.py, so we expect 404.
    # Updating test to reflect current API structure.
    response = client.get("/")
    assert response.status_code == 404


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
