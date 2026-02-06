# Module-2---Project-2

Full-stack HR project with a Node/Express + MySQL backend and a Vue (Vite) frontend.

Repository:
```
https://github.com/ImaanCummings/Module-2---Project-2.git
```

## Requirements
- Node.js (v20+ recommended)
- npm (comes with Node)
- MySQL or MariaDB running locally

## Clone the Repo
```
git clone https://github.com/ImaanCummings/Module-2---Project-2.git
```

## Navigate (cd) Into a Folder
```
cd Module-2---Project-2
```

To go up one folder:
```
cd ..
```

## Backend Setup
Backend lives in:
```
Module-2---Project-2
```

### Install Dependencies
```
cd Module-2---Project-2
npm install
```

### Database Setup
1. Create the database:
```
CREATE DATABASE moderntech_solutions_database;
```

2. Import the SQL schema and seed data:
```
updated_project2.sql
```
You can import it using your MySQL client or GUI.

3. Confirm DB connection settings in:
```
Module-2---Project-2/db.js
```

### Run the Backend
Development (nodemon):
```
npm run dev
```

Production:
```
npm start
```

Backend runs on:
```
http://localhost:3000
```

Useful endpoints:
- `GET /employees`
- `POST /employees`
- `GET /reviews`
- `POST /reviews`
- `GET /attendance`
- `POST /attendance`
- `GET /payroll`
- `POST /payroll`
- `GET /timeoff`
- `POST /timeoff`
- `PATCH /timeoff/:id`

## Frontend Setup
Frontend lives in:
```
Module-2---Project-2/frontend/group-project1
```

### Install Dependencies
```
cd Module-2---Project-2/frontend/group-project1
npm install
```

### Run the Frontend
```
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

## Tests
Backend tests:
```
cd Module-2---Project-2
npm test
```

Frontend tests:
```
cd Module-2---Project-2/frontend/group-project1
npm test
```

## Common Issues
- Make sure you are running the backend from `Module-2---Project-2`, not the top-level `hr_backend`.
- If the UI shows no data, check the browser Network tab for failed API calls.
- Ensure the database in `Module-2---Project-2/db.js` matches the one you imported.
