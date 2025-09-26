# Frontend Self-Assessment

## Overview
We used React + Vite + Tailwind. The app provides a jobs listing experience with authentication integration against the starter backend variant. There is also support for a public backend variant (no auth) for simpler demos.

## What We Implemented
- Pages: Home, Jobs, Job detail, Add job, Edit job, Not found, Login, Signup.
- Components: Navbar, JobListings, JobListing, Spinner, Cards/Hero.
- Routing with loaders for job detail.
- API proxy configured in `vite.config.js` to point to the backend (`/api`).
- Empty list handling with a friendly message.

## Authentication Integration
- Signup/Login forms POST to `/api/users/signup` and `/api/users/login`.
- On success, we store JWT in `localStorage` under `authToken`.
- Protected actions (Add/Edit/Delete job) include `Authorization: Bearer <token>`.
- Fix applied: `DELETE` previously missed the header; added it in `App.jsx`.

## Key Improvements
1) Consistent token usage
- Ensured Add, Edit, and Delete all read from the same `localStorage` key and send the bearer token when needed.

2) Robust UX states
- Loading spinner for data fetching.
- Clear empty-state message when no jobs are returned.
- Toast notifications on auth and CRUD actions.

3) Performance and code clarity
- Limited home listings via `_limit=3` to reduce payload and visually match a "recent jobs" section.
- Kept components small and focused (listing vs item, spinner separate).

## Debugging Examples
- 401 on delete fixed by adding the missing `Authorization` header.
- Proxy alignment: switched proxy target to the real API port (4000) once backend was ready.

## Testing Notes
- Manual testing for:
  - Signup/Login happy-path and error responses.
  - Listing fetch success and empty list.
  - Add/Edit/Delete behaviors, including unauthorized attempts (when logged out).

## Next Steps
- Extract a small `apiClient` helper to centralize token header logic and error handling.
- Add a `useFetch` hook for reusable loading/error/data patterns across pages.
- Consider route guards (e.g., disable Add/Edit/Delete UI elements if not authenticated).
