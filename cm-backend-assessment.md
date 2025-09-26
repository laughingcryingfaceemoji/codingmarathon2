# Backend Self-Assessment

## Overview
We built two Express + Mongoose API variants:
- api-server-starter: authentication + ownership checks
- api-server-withoutauth: public CRUD for jobs (no users, no auth)

The authenticated API provides user signup/login via JWT, protects create/update/delete on jobs, and enforces owner-only mutations. The public API keeps the same data model for jobs but intentionally removes users and auth for simpler deployments/testing.

## What We Implemented
- Jobs CRUD with a nested `company` subdocument and `timestamps`.
- Auth endpoints: `/api/users/signup`, `/api/users/login`.
- Protected job mutations: `POST /api/jobs`, `PUT /api/jobs/:id`, `DELETE /api/jobs/:id`.
- Public reads: `GET /api/jobs`, `GET /api/jobs/:id`.
- Request plumbing: CORS, JSON body parsing, request logging (morgan).
- Central error handling (`unknownEndpoint`, `errorHandler`).
- MongoDB connection with fail-fast if `MONGO_URI` is missing.
- Health check at `/` and respecting `PORT` (Render-friendly).

## Key Improvements
1) Ownership + schema consistency
- Problem: controllers filtered by `user_id` but the job schema didn’t include it.
- Fix: added `user_id` (ObjectId, ref: `User`, required) to `jobSchema` in the starter API.
- Result: owner enforcement works for update/delete.

2) Pagination and sort
- Implemented `_limit` and `createdAt` descending ordering for job listings.
- Result: predictable “most recent first” lists and lightweight home page queries.

3) Public API split
- Created `api-server-withoutauth` with no users or `requireAuth`.
- Result: deploys cleanly for scenarios where auth is not needed; reduces surface area for demo/testing.

## Debugging Examples
- 401 on DELETE: frontend wasn’t sending `Authorization` header; adding `Bearer <token>` fixed protected routes.
- MODULE_NOT_FOUND on Render (public API): removing `userRouter` import/mount in `app.js` resolved deploy crash.

## Authentication Design (starter API)
- Password hashing with bcrypt (salted).
- JWT signed with `SECRET`, 7-day expiry.
- `requireAuth` verifies token, injects `req.user`.
- Ownership in controllers enforced via `{ _id: id, user_id: req.user._id }` filters.

## Deployment Notes
- Set `MONGO_URI` and `SECRET` env vars for the authenticated API.
- Health check on `/` supports platform probes.
- Uses `process.env.PORT`.

## Testing Notes
- Exercised positive/negative flows in Postman.
- Cases: invalid IDs, missing token, incorrect credentials, empty list states.

## Next Steps
- Input validation (Joi/Zod) + rate limiting.
- Integration tests (test DB + seed data).
- Optional: role-based access control if required later.
