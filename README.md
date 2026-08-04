This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# 📚 Personal Book Manager API Documentation

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- HttpOnly Cookies
- Tailwind CSS
- Zod Validation

---

# Base URL

Local

```
http://localhost:3000/api
```

Production

```
https://your-domain.com/api
```

---

# Authentication

Authentication is handled using **JWT stored in HttpOnly Cookies**.

The frontend **does not need to store tokens** in localStorage or sessionStorage.

After successful login/signup, cookies are automatically sent with future requests.

---

# API Response Format

## Success

```json
{
  "success": true,
  "message": "Operation successful"
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# Authentication APIs

---

## 1. Signup

### Endpoint

```
POST /auth/signup
```

### Body

```json
{
  "fullName": "Adnan Shaikh",
  "email": "adnan@gmail.com",
  "password": "12345678"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "...",
    "fullName": "Adnan Shaikh",
    "email": "adnan@gmail.com"
  }
}
```

---

## 2. Signin

### Endpoint

```
POST /auth/signin
```

### Body

```json
{
  "email": "adnan@gmail.com",
  "password": "12345678"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "fullName": "Adnan Shaikh",
    "email": "adnan@gmail.com"
  }
}
```

---

## 3. Current User

### Endpoint

```
GET /auth/me
```

### Body

None

### Success Response

```json
{
  "success": true,
  "message": "User fetched successfully",
  "user": {
    "id": "...",
    "fullName": "Adnan Shaikh",
    "email": "adnan@gmail.com"
  }
}
```

---

## 4. Logout

### Endpoint

```
POST /auth/logout
```

### Body

None

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# Books APIs

All Book APIs require authentication.

---

## 1. Create Book

### Endpoint

```
POST /books
```

### Body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "tags": [
    "Self Help",
    "Productivity"
  ],
  "status": "Reading"
}
```

### Status Values

```
Want to Read

Reading

Completed
```

### Success Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "book": {}
}
```

---

## 2. Get All Books

### Endpoint

```
GET /books
```

---

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search title or author |
| status | string | No | Reading status |
| tag | string | No | Filter by tag |
| page | number | No | Default 1 |
| limit | number | No | Default 10 |
| sort | string | No | newest, oldest, title, author |

---

## Example

```
GET /books?page=1&limit=10
```

```
GET /books?search=Atomic
```

```
GET /books?status=Reading
```

```
GET /books?tag=Productivity
```

```
GET /books?sort=title
```

```
GET /books?page=2&limit=5&sort=oldest
```

```
GET /books?search=Atomic&status=Reading&sort=title&page=1&limit=10
```

---

## Response

```json
{
  "success": true,
  "message": "Books fetched successfully",

  "books": [],

  "pagination": {

    "page": 1,

    "limit": 10,

    "totalBooks": 20,

    "totalPages": 2,

    "hasNextPage": true,

    "hasPreviousPage": false

  }
}
```

---

## 3. Get Single Book

### Endpoint

```
GET /books/:id
```

Example

```
GET /books/6891abc123456789
```

Response

```json
{
  "success": true,
  "book": {}
}
```

---

## 4. Update Book

### Endpoint

```
PUT /books/:id
```

Only send fields that need updating.

Example

```json
{
  "status": "Completed"
}
```

Or

```json
{
  "title": "Atomic Habits Updated",
  "tags": [
    "Habit",
    "Self Help"
  ]
}
```

---

## 5. Delete Book

### Endpoint

```
DELETE /books/:id
```

Response

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

# Dashboard API

## Statistics

### Endpoint

```
GET /dashboard/stats
```

### Response

```json
{
  "success": true,
  "message": "Dashboard statistics fetched successfully",

  "statistics": {

    "totalBooks": 15,

    "wantToRead": 4,

    "reading": 6,

    "completed": 5

  }
}
```

---

# Health API

## Endpoint

```
GET /health
```

### Response

```json
{
  "success": true,

  "status": "OK",

  "database": "Connected",

  "environment": "development",

  "timestamp": "2026-08-03T15:45:22.000Z",

  "uptime": 305
}
```

---

# Authentication Flow

```
Signup

↓

JWT Cookie Created

↓

Signin

↓

JWT Cookie Updated

↓

GET /auth/me

↓

Dashboard

↓

Books APIs

↓

Logout

↓

Cookie Cleared
```

---

# Error Codes

| Status | Meaning |
|---------|----------|
| 200 | Success |
| 201 | Created Successfully |
| 400 | Validation Error |
| 401 | Unauthorized |
| 404 | Resource Not Found |
| 409 | Conflict (Email already exists) |
| 500 | Internal Server Error |

---

# Backend Features

✅ JWT Authentication

✅ HttpOnly Cookies

✅ Password Hashing (bcrypt)

✅ MongoDB Atlas

✅ Mongoose ODM

✅ Zod Validation

✅ Protected Routes

✅ RESTful APIs

✅ Pagination

✅ Sorting

✅ Search

✅ Status Filter

✅ Tag Filter

✅ Dashboard Statistics

✅ Health Check

---

# Frontend Integration Notes

- Authentication is cookie-based. No need to manually attach JWT tokens.
- Ensure API requests include credentials when calling from a different origin (for example, `credentials: 'include'` in `fetch` or the equivalent in Axios).
- Use the `pagination` object returned by `GET /books` to build pagination controls.
- Use the `statistics` endpoint to populate dashboard summary cards.
- Use `GET /books/:id` to load data into the Edit Book form.
- Always handle `401 Unauthorized` by redirecting the user to the Sign In page.