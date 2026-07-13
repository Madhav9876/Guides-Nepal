# Routing Structure

Base: `/dashboard`

- `/dashboard/login` — Unified login
- `/dashboard/admin/*` — Admin-only routes
  - index — Overview
  - `hosts`, `guides`, `content`, `analytics`, `revenue`, `settings`
- `/dashboard/host/*` — Host-only routes
  - index — Overview
  - `guides`, `tours`, `bookings`, `earnings`, `performance`
- `/dashboard/guide/*` — Guide-only routes
  - index — Overview
  - `my-tours`, `my-bookings`, `schedule`, `earnings`, `profile`
- `/dashboard/content-writer/*` — Contant Writer-only routes
  - index — Overview
  - `pages`, `blog`, `guides-content`

Guards:
- `RequireAuth` fetches role via `/auth/me`
- `RequireRole` ensures only the correct role layout/page renders
