# Guides Nepal Dashboard

Production-ready RBAC dashboard for Admin, Host, and Guide, isolated from the public website and consuming existing backend APIs.

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:5174/dashboard

## Roles and Routing

- Admin: `/dashboard/admin/*`
- Host: `/dashboard/host/*`
- Guide: `/dashboard/guide/*`
- Content Writer: `/dashboard/content-writer/*`

See [ROLES.md](./docs/ROLES.md), [ROUTING.md](./docs/ROUTING.md), and [PERMISSIONS.md](./docs/PERMISSIONS.md).

## Visual Design

- Reference-style dashboard: hero greeting, KPI cards with deltas, charts, tasks, schedule
- Shared components: KPICard, Table, BarChart, DonutChart, Badge, SchedulePanel, Modal
- Theme colors defined in Tailwind config

See [UX.md](./docs/UX.md) and [IA.md](./docs/IA.md).

## Admin Actions

- Hosts: Add, Edit, Suspend, Promote, Remove
- Guides: Add, Edit, Verify, Promote, Suspend, Remove
- Content Writers: Add, Edit, Suspend, Remove

All actions are wired to UI state with modals and forms; ready to connect to backend APIs.

## Mock Data

Realistic datasets populate all tables and charts.

See [mock/data.ts](./src/mock/data.ts).

## Scripts

- Typecheck: `npm run typecheck`
- Dev: `npm run dev`
- Seed admin (dev-only): `npm run seed:admin`

Note: `scripts/seed-admin.js` contains a dev password for local seeding. Do not use in production; keep `.env` secrets safe.

## Next Steps

- Wire Admin actions to backend endpoints with RBAC
- Add filters/search/pagination on data tables
- Add export, bulk actions, and confirmation modals
