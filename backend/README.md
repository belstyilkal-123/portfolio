# Backend API

This folder contains the Express API for the portfolio application.

## Structure

- `backend/src/config/`
  - Database connection logic.
- `backend/src/controllers/`
  - Request handlers for auth, projects, and messages.
- `backend/src/middlewares/`
  - Authentication, error handling, and validation middleware.
- `backend/src/models/`
  - Mongoose models for `User`, `Project`, and `Message`.
- `backend/src/routes/`
  - API route definitions.
- `backend/src/seeder.ts`
  - Utility script to import example project data and create a default admin user.

## Environment variables

Create a `.env` file in `backend/` with the following values:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin1234
```

## Run backend

Install dependencies and start the server:

```bash
npm install
npm run dev
```

## Seed data

Run the backend seed script to import sample projects and create an admin user:

```bash
npm run seed
```

## API endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/projects`
- `POST /api/projects` (admin only)
- `DELETE /api/projects/:id` (admin only)
- `GET /api/messages` (admin only)
- `PUT /api/messages/:id/read` (admin only)
