# Guides Nepal

A React + Vite app showcasing city experiences (Kathmandu, Pokhara, Lalitpur, Bhaktapur, Bharatpur) with consistent booking UI across pages.

## Overview
- Frontend: React 18 + Vite + Tailwind
- Backend: FastAPI (auth, bookings, public data, AI chat)
- Dashboard: Separate app under `dashboard-app/`

## Requirements
- Node.js 18+
- npm

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — build production bundle
- `npm run preview` — serve built bundle locally
- `npm run check` — TypeScript project check
- `npm run lint` — ESLint (repo has some unrelated dashboard lint errors)

## Environment
- Frontend:
  - `VITE_API_URL` — base URL of backend (e.g., `http://192.168.x.x:8000`)
- Backend:
  - `DATABASE_URL`, `SECRET_KEY`, `ENV`
  - Optional AI:
    - `AI_PROVIDER` (`auto` | `ollama`)
    - `OLLAMA_URL` (default `http://localhost:11434`)
    - `OLLAMA_MODEL` (default `llama3.2:latest`)
    - `OPENAI_API_KEY` (optional)

## Local Publish (shareable link)
1. Build the app:
   - `npm run build`
2. Serve the build and expose to network:
   - `npm run preview -- --host`
   - Use the printed network URL (e.g., http://192.168.x.x:4173/) to share on the same network.

## Backend API
- Dev: `uvicorn app.main:app --reload` (inside `backend/`)
- Health: `GET /health`
- API base: `/api/v1`
- AI Chat:
  - Non-stream: `POST /api/v1/ai/chat`
  - Stream: `POST /api/v1/ai/chat/stream` (text/plain)
  - Provider:
    - Auto-detects local Ollama if available
    - Uses OpenAI if `OPENAI_API_KEY` is set
    - Falls back with friendly direct answers

## User Profile & Bookmarks
- Frontend pages:
  - `src/pages/user/ProfilePage.tsx` — view/edit profile, avatar upload
  - `src/pages/user/FavoritesPage.tsx` — saved places/bookmarks
- State:
  - `src/store/authStore.ts` — auth + user fields
  - `src/store/profileStore.ts` — profile data, travel photos, bookmarks
- Header:
  - Profile icon now navigates to `/profile` directly; dropdown remains on hover
- Avatar uploads:
  - Posts `multipart/form-data` to backend when available
  - Falls back to local data URL preview if backend is offline

### Profile/Bookmarks API
- Base: `/api/v1/profile`
- Get current profile: `GET /api/v1/profile/me`
- Update profile: `PATCH /api/v1/profile/me` (JSON body: any of `firstName`, `lastName`, `email`, `phone`, `bio`, `avatar_url`)
- Upload photo: `POST /api/v1/profile/photos/upload` (form field: `file`), returns `{ url }`
- List bookmarks: `GET /api/v1/profile/bookmarks`
- Add bookmark: `POST /api/v1/profile/bookmarks` (JSON: `title`, optional `city`, `image`, `link`)
- Delete bookmark: `DELETE /api/v1/profile/bookmarks/{bookmark_id}`

### Static Uploads
- Served from `/uploads` (mounted by FastAPI)
- Files stored under `backend/app/uploads/<user_id>/...`

## FOSS AI (Ollama)
- Install: `brew install ollama` (macOS)
- Run: `ollama serve`
- Model: `ollama pull llama3.2`
- Optional backend env:
  - `AI_PROVIDER=ollama`
  - `OLLAMA_URL=http://localhost:11434`
  - `OLLAMA_MODEL=llama3.2:latest`

## Streaming Behavior
- Frontend streams tokens and updates the assistant bubble as they arrive.
- If streaming fails, it falls back to non-stream endpoint automatically.
- Example pages:
  - `src/pages/user/ChatPage.tsx`
  - `src/pages/MailaDaiChatPage.tsx`

## Booking UI Parity
All experience pages implement the same booking card as the Kathmandu reference:
- Mobile fixed bottom bar with price + Book Now
- Desktop sticky card with:
  - Star ratings + “(124 reviews)” fallback
  - “€{price} / person”
  - Check In / Check Out date inputs
  - Guests select
  - Start Time select (default 09:00 AM)
  - Selected Guide with Change
  - Book Now + “You won’t be charged yet”
  - Price breakdown and Total

## Deploy Options
- Vercel (recommended):
  - Import repo in Vercel; framework auto-detected.
  - Add a rewrite for SPA routing:
    - Settings → Routes → Add: `{ "src": "/(.*)", "dest": "/index.html" }`
- Netlify:
  - Add `_redirects` file in `public` with: `/* /index.html 200`
  - Deploy the repo; build command: `npm run build`, publish dir: `dist`
- GitHub Pages:
  - Build `dist`
  - Deploy `dist` to `gh-pages` branch
  - SPA fallback requires copying `index.html` to `404.html` in `dist` or a custom setup; GitHub Pages doesn’t support rewrites natively.

## Vercel Setup

- Build
  - Framework: Vite (auto)
  - Build command: `npm run build`
  - Output directory: `dist`
- Routing
  - `vercel.json` in repo rewrites all routes to `index.html` for SPA
- Environment Variables
  - Frontend
    - `VITE_API_URL` — backend base URL (e.g., `https://your-backend-domain`)
    - `FRONTEND_OAUTH_REDIRECT` — `https://<your-vercel-domain>/auth/callback`
    - Optional overrides:
      - `VITE_GOOGLE_OAUTH_URL` — override backend Google start URL
      - `VITE_FACEBOOK_OAUTH_URL` — override backend Facebook start URL
  - Backend (set wherever FastAPI is hosted)
    - `BACKEND_CORS_ORIGINS` — comma-separated origins (include your Vercel domain)
    - Google OAuth:
      - `GOOGLE_CLIENT_ID`
      - `GOOGLE_CLIENT_SECRET`
      - `GOOGLE_REDIRECT_URI` — `https://<backend-host>/api/v1/auth/oauth/google/callback`
    - Facebook OAuth:
      - `FACEBOOK_CLIENT_ID`
      - `FACEBOOK_CLIENT_SECRET`
      - `FACEBOOK_REDIRECT_URI` — `https://<backend-host>/api/v1/auth/oauth/facebook/callback`
- OAuth Flow
  - Frontend triggers social sign-in from Login modal
  - Backend handles provider start/callback, issues app JWTs
  - Frontend completes login on `/auth/callback` route using query params

## Backend Deploy (Render)
- Render blueprint provided at repo root: `render.yaml`
- Provisions a Postgres instance and a Dockerized web service
- Set `OPENAI_API_KEY` if using OpenAI; Ollama can be used on a private server

## Push to GitHub
Initialize and push:
```bash
git init
git add .
git commit -m "feat: AI chat streaming (Ollama/OpenAI), docs, deploy config"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes
- Dev server default: http://localhost:5175
- Preview server default: http://localhost:4173
- To update prices or content, edit files in `src/data/*RichData.ts`.

---

## Full Stack Quick Start

- Frontend
  - Install: `npm install`
  - Dev: `npm run dev` (Vite server with proxy to backend `/api/v1`)
  - Build: `npm run build`
  - Preview: `npm run preview -- --host`

- Backend
  - Create venv: `python -m venv .venv && source .venv/bin/activate`
  - Install: `pip install -r backend/requirements.txt`
  - Env (example):
    - `export DATABASE_URL="postgresql://user:pass@localhost:5432/guides_nepal"`
    - `export SECRET_KEY="dev-secret"`
    - `export ENV="development"`
  - Run: `cd backend && uvicorn app.main:app --reload`
  - Static uploads served at `/uploads`

## Backend Quality & Tests

- Run all checks: `cd backend && ./scripts/run_checks.sh`
  - Black (format), Ruff (lint), Mypy (types), Pytest (tests), Bandit (security)
- Individual commands:
  - Format: `black .`
  - Lint: `ruff check .`
  - Types: `mypy .`
  - Tests: `PYTHONPATH=$PYTHONPATH:. pytest`

## Database & Migrations

- SQLAlchemy models under `backend/app/models/*`
- Alembic migrations configured (`backend/migrations/`)
- Typical flow:
  - Generate: `alembic revision -m "add bookmarks"`
  - Upgrade: `alembic upgrade head`
  - Dry-run SQL: `alembic upgrade head --sql`

## API Summary

- Base: `/api/v1`
- Auth: `/api/v1/auth/*`
- Bookings: `/api/v1/bookings/*`
- Public: `/api/v1/*`
- AI:
  - `POST /api/v1/ai/chat` → JSON reply (supports Ollama/OpenAI)
  - `POST /api/v1/ai/chat/stream` → text/plain streaming
- Profile:
  - `GET /api/v1/profile/me`
  - `PATCH /api/v1/profile/me`
  - `POST /api/v1/profile/photos/upload` (multipart `file`)
  - `GET /api/v1/profile/bookmarks`
  - `POST /api/v1/profile/bookmarks`
  - `DELETE /api/v1/profile/bookmarks/{bookmark_id}`

## Frontend Features

- Pages:
  - Experiences per city with consistent booking UI
  - User Profile (edit info, upload avatar, view photos)
  - Favorites (bookmarks)
  - Chat pages with AI assistant
- State:
  - `src/store/authStore.ts` → authentication, user info
  - `src/store/profileStore.ts` → profile details, photos, bookmarks
- Header:
  - Mobile login button
  - Profile icon navigates to `/profile` with dropdown on hover
- Avatar Upload:
  - Tries backend upload, falls back to local preview if offline
- Login Persistence:
  - Auth state (user, tokens) persists via localStorage using Zustand’s persist middleware
  - Logout clears all auth state and tokens safely

## Security Notes

- No secrets in repo; use environment variables
- Bandit flagged non-critical patterns in streaming code (timeouts and try/except control flow)
  - To harden: add request timeouts and handle exceptions explicitly in streaming paths

## Contributing

- PRs welcome; run `./scripts/run_checks.sh` before pushing
- Follow TypeScript/ESLint rules in the root app
- Keep README updated when adding endpoints or features
#   G u i d e s - N e p a l  
 