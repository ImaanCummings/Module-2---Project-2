# ModernTech Solutions HR API

This project is the Module 2 back-end for the ModernTech Solutions HR system. It provides a Node.js and MySQL API for employee management, payroll, attendance, performance reviews, time-off handling, and authentication.

## Rubric Comparison Summary

The supplied project brief and rubric emphasize these backend requirements:

- SQL-backed data architecture with proper relationships
- Server-side validation and consistent error handling
- Secure authentication with protected credentials
- Frontend-backend integration through clear API endpoints
- GitHub documentation and explanation of the technical implementation

This repository now addresses those requirements with:

- MySQL tables and foreign-key relationships for employees, payroll, and attendance
- Validation on the HR data entry endpoints
- Secure authentication endpoints using salted password hashing and signed access tokens
- REST API routes that can be consumed by the existing frontend
- Automated tests covering the key routes and authentication flow

## API Endpoints

- `GET /health`
- `GET /employees`
- `POST /employees`
- `GET /attendance`
- `POST /attendance`
- `GET /reviews`
- `POST /reviews`
- `GET /timeoff`
- `POST /timeoff`
- `PATCH /timeoff/:id`
- `GET /leave`
- `POST /leave`
- `PATCH /leave/:id`
- `GET /payroll`
- `GET /payroll/:employee_id`
- `POST /payroll`
- `POST /auth/register`
- `POST /auth/login`

## Authentication

Authentication is implemented with two endpoints:

- `POST /auth/register` creates a user with an email, password, and role
- `POST /auth/login` validates credentials and returns a signed token

Passwords are salted and hashed before storage. Supported roles are `hr`, `manager`, and `employee`.

Example register payload:

```json
{
  "email": "hr@moderntech.com",
  "password": "SecurePass123",
  "role": "hr"
}
```

Example login payload:

```json
{
  "email": "hr@moderntech.com",
  "password": "SecurePass123"
}
```

## Run Locally

1. Create a MySQL database named `moderntech_solutions_database`.
2. Import [`updated_project2.sql`](/c:/Users/Onke%20Mbingeleli/Downloads/LifeChoicesAcademy/ModernTech%20Solutions-2/updated_project2.sql).
3. Set environment variables for `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and optionally `TOKEN_SECRET`.
4. Install dependencies with `npm install`.
5. Start the server with `npm start`.

## Testing

Run:

```bash
npm test
```
