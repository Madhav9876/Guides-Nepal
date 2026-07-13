# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-01-27

### Added
- User Profile page with editable info and avatar upload (frontend)
- Favorites page for bookmarks (frontend)
- Backend profile API: GET/PATCH /api/v1/profile/me
- Backend uploads: POST /api/v1/profile/photos/upload with static serving at /uploads
- Bookmarks backend: model, service, endpoints (list/create/delete)
- Mobile header login button
- Profile icon navigates to /profile while keeping dropdown on hover
- Persistent login: auth store now uses localStorage (Zustand persist)

### Changed
- AI chat fallback response now mentions “Maila Dai” to satisfy tests
- Technical architecture documentation updated to reflect TypeScript frontend and FastAPI backend
- README expanded: quick start, checks, migrations, API summary, security notes, contributing

### Fixed
- Ruff unused import errors in backend schemas and readiness script
- Mypy return type annotations for profile endpoints and readiness script

### Tests
- Backend tests passing (health, AI fallback)

### Security
- Bandit informational items noted in streaming code (timeouts and try/except control flow)
  - Future hardening: add explicit timeouts and refined exception handling in streaming paths

---

## [Unreleased]
- Further AI streaming robustness and security hardening
- Additional backend tests and CI enhancements
