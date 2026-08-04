# Frontend Portfolio App

This folder contains the public React + Vite portfolio website and the admin portal.

## Structure

- `frontend/src/pages/`
  - Public website pages: `Dashboard`, `About`, `Projects`, `Skills`, `Contact`, and more.
- `frontend/src/admin/`
  - Admin portal pages: `Login`, `Register`, `AdminDashboard`, `ManageProjects`, `ManageMessages`.
- `frontend/src/layouts/`
  - Shared app layout, header, sidebar, footer, and UI components.

## Admin portal routes

- `/admin/login`
- `/admin/register`

## Run frontend

```bash
npm install
npm run dev
```

The frontend server uses Vite and expects the backend API at `http://localhost:5000/api` by default.

## Notes

- Admin pages are separated into `frontend/src/admin/` for cleaner structure.
- Public portfolio pages live in `frontend/src/pages/`.
