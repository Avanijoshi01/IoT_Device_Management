# Authentication API

## Endpoints

- `POST /api/auth/register` — Register a new user (Admin, Manager, Operator)
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/admin-only` — Example protected route (Admin only)
- `POST /api/auth/forgot-password` — Request password reset email
- `POST /api/auth/reset-password/:token` — Reset password with token

## Environment Variables

- `JWT_SECRET` — Secret for JWT signing
- `EMAIL_USER` — Email address for sending password reset emails (Gmail recommended)
- `EMAIL_PASS` — Email password or app password
- `FRONTEND_URL` — URL for password reset link (e.g., http://localhost:3000) 