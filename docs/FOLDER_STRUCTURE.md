# Project Folder Structure

This document outlines the organization of the source code for Guides-Nepal.

```
guides-nepal/
├── frontend/                # Customer-facing web app (Vite + React)
│   ├── public/              # Static assets (favicon, images)
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── data/            # Static / seed-like TS data
│       ├── pages/           # Page components (route targets)
│       ├── store/           # Zustand stores and auth/profile state
│       ├── styles/          # Tailwind + global CSS
│       └── utils/           # Frontend-only utilities
├── dashboard/               # Admin/host/writer dashboard (separate Vite app)
│   ├── public/
│   └── src/
│       ├── admin/           # Admin area pages
│       ├── host/            # Host dashboards
│       ├── guide/           # Guide dashboards
│       ├── writer/          # Content/SEO workflows
│       ├── components/      # Dashboard UI components
│       └── state/           # Dashboard auth and role stores
├── backend/                 # FastAPI backend + database layer
│   ├── app/
│   │   ├── api/             # Versioned API routers (auth, public, bookings, etc.)
│   │   ├── core/            # Settings, security, database
│   │   ├── models/          # SQLAlchemy models (User, Guide, Booking, Bookmark)
│   │   ├── schemas/         # Pydantic schemas for requests/responses
│   │   └── services/        # Business logic (AuthService, GuideService, etc.)
│   ├── migrations/          # Alembic migrations
│   ├── scripts/             # Helper scripts (health checks, seeders)
│   └── tests/               # Pytest-based backend tests
└── docs/                    # High-level documentation
```

## Key Directories

### `frontend/src/components/`
Customer-facing React components, organized by feature (e.g., `auth`, `home`) or type (`common`).
- **`common/`**: Stateless UI primitives like buttons, cards, header/footer, layout.
- **`home/`**: Homepage-specific sections (hero, featured experiences, testimonials).

### `frontend/src/pages/`
Top-level page components mapped from the main router in `frontend/src/App.tsx`.
- **City folders**: `kathmandu/`, `pokhara/`, `lalitpur/`, `bhaktapur/`, `bharatpur/` group city-specific pages.
- **`LocalProfilePage.tsx`**: Detailed guide profile, powered by the backend `/guides/{id}` API.

### `frontend/src/data/`
Front-end facing "catalog" data and types.
- **`types.ts`**: Shared TypeScript interfaces for guides/experiences used by the UI.

### `frontend/src/store/`
Global client-side state management using Zustand.
- **`authStore.ts`**, **`profileStore.ts`**, **`bookingStore.ts`**, **`uiStore.ts`**: Auth, profile, booking, and UI state.

### `frontend/src/utils/`
UI utilities.
- **`cn.ts`**: Classname merging helper for Tailwind.
- **`currencyConverter.ts`**: Handles currency conversion logic for prices.

### `backend/app/`
Backend service code.
- **`api/v1/`**: FastAPI routers (`auth.py`, `public.py`, `bookings.py`, etc.).
- **`models/`**: Database models (`User`, `Guide`, `Booking`, `Bookmark`).
- **`schemas/`**: Pydantic models for requests/responses.
- **`services/`**: Business logic layer used by the API (e.g., `GuideService`, `AuthService`).

### `dashboard/src/`
Dashboard-specific React app for internal roles.
- **`admin/`, `host/`, `guide/`, `writer/`**: Area-specific pages.
- **`components/`**: Tables, charts, forms, and layout primitives reused across dashboard views.
