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



# 📚 Book Library Manager — Frontend

The frontend provides a clean, responsive, and user-friendly interface for managing a personal book library.

Users can create an account, sign in, manage books, track reading progress, search and filter their library, view statistics, and securely logout.

---

## Table of Contents

- [Authentication](#-authentication)
  - [Sign Up](#-sign-up)
  - [Sign In](#-sign-in)
  - [Authentication Loading State](#authentication-loading-state)
- [User Notifications](#-user-notifications)
- [Dashboard](#-dashboard)
  - [Reading Statistics](#-reading-statistics)
  - [Recent Books](#-recent-books)
  - [Change Reading Status](#-change-reading-status)
- [My Books](#-my-books)
  - [Add Book](#-add-book)
  - [Edit Book](#️-edit-book)
  - [Delete Book](#️-delete-book)
  - [Search Books](#-search-books)
  - [Filter Books by Reading Status](#-filter-books-by-reading-status)
  - [Sort Books](#️-sort-books)
  - [Book Tags](#️-book-tags)
  - [Book Reading Status](#-book-reading-status)
  - [Pagination](#-pagination)
  - [Previous and Next Navigation](#️-previous-and-next-navigation)
  - [Empty State](#️-empty-state)
  - [Loading States](#-books-loading-state)
- [User Profile Display](#-user-profile-display)
- [Logout](#-logout)
- [Navigation](#-navigation)

---

## 🔐 Authentication

Authentication screens provide users with a simple and secure way to access their personal library.

The frontend includes:

- Sign Up
- Sign In
- Password visibility
- Form validation
- Loading states
- Error handling
- Success notifications
- Logout
- Logged-in user information

---

### 📝 Sign Up

The Sign Up page allows new users to create their personal book manager account.

The form contains:

- Full Name
- Email
- Password
- Confirm Password

**Example:**

```
Full Name
[ John Doe ]

Email
[ john@example.com ]

Password
[ *************** 👁 ]

Confirm Password
[ *************** 👁 ]

[ Create Account ]
```

---

### 🔑 Sign In

The Sign In page allows existing users to access their personal library.

The form contains:

- Email
- Password
- Password visibility toggle
- Sign In button

**Example:**

```
Email
[ john@example.com ]

Password
[ *************** 👁 ]

[ Sign In ]

Don't have an account?
Create Account
```

The frontend displays validation messages when the entered information is invalid.

After successful sign in, the user is taken to the Dashboard.

---

### Authentication Loading State

The Sign In and Sign Up buttons display a loading state while the request is being processed.

Instead of allowing the user to repeatedly submit the form, the button becomes disabled while processing.

**Example:**

```
[ Creating Account... ]
```

---

## 🔔 User Notifications

The application uses toast notifications to provide immediate feedback.

**Success examples:**

- Account created successfully
- Login successful
- Logged out successfully
- Book added successfully
- Book updated successfully
- Book deleted successfully
- Status updated

**Error examples:**

- Something went wrong
- Update failed
- Delete failed
- Invalid email
- Password does not match

Notifications appear without requiring the user to leave the current page.

---

## 🏠 Dashboard

The Dashboard provides a quick overview of the user's personal book library.

It gives users a summary of their reading progress without requiring them to open the complete books page.

The Dashboard includes:

- Total Books
- Want to Read
- Reading
- Completed
- Recent Books
- Reading status controls

---

### 📊 Reading Statistics

The Dashboard displays four statistics.

| Stat | Description |
|------|-------------|
| **Total Books** | Shows the total number of books in the user's personal library. |
| **Want to Read** | Shows how many books the user plans to read. |
| **Reading** | Shows how many books the user is currently reading. |
| **Completed** | Shows how many books the user has finished. |

**Example:**

```
┌──────────────────┐
│ 📚 Total Books   │
│       15         │
└──────────────────┘

┌──────────────────┐
│ 📖 Want to Read  │
│        4         │
└──────────────────┘

┌──────────────────┐
│ 📕 Reading       │
│        6         │
└──────────────────┘

┌──────────────────┐
│ ✅ Completed     │
│        5         │
└──────────────────┘
```

The statistics automatically reflect the user's current library.

---

### 📚 Recent Books

The Dashboard displays recently added books so users can quickly access their latest library items.

Each book can display:

- Book title
- Author
- Tags
- Reading status

**Example:**

```
Atomic Habits
James Clear

Self Help   Productivity

Status:
[ Reading ▼ ]
```

This gives users a quick view of their current library activity.

---

### 🔄 Change Reading Status

Users can change the reading status of a book directly from the Dashboard.

**Available statuses:**

- Want to Read
- Reading
- Completed

**Example:**

```
Atomic Habits
James Clear

Status:
[ Reading ▼ ]
```

The user can select another status without opening the Edit Book form.

```
Want to Read
     ↓
Reading
     ↓
Completed
```

After changing the status, the interface provides feedback to the user and updates the related dashboard statistics.

---

## 📚 My Books

The My Books page is the main library management screen.

It allows users to view and manage all books in their personal library.

Users can:

- Add books
- Edit books
- Delete books
- Search books
- Filter books
- Sort books
- Change pages
- View reading status

---

### ➕ Add Book

Users can add a new book by clicking:

```
[ + Add Book ]
```

A modal opens with the book form.

The form contains:

- Title
- Author
- Tags
- Reading Status

**Example:**

```
Add Book

Title
[ Atomic Habits ]

Author
[ James Clear ]

Tags
[ Self Help, Productivity ]

Reading Status
[ Want to Read ▼ ]

[ Cancel ] [ Save Book ]
```

After successfully adding the book:

- The modal closes.
- A success notification is displayed.
- The books list is refreshed.
- Dashboard statistics are refreshed.

---

### ✏️ Edit Book

Users can edit an existing book from the book card.

When the user clicks Edit, the book form opens with the existing information already filled in.

**Example:**

```
Edit Book

Title
[ Atomic Habits ]

Author
[ James Clear ]

Tags
[ Self Help, Productivity ]

Reading Status
[ Reading ▼ ]

[ Cancel ] [ Update Book ]
```

Users can modify any required information and save the changes.

After updating:

- The modal closes.
- A success notification is shown.
- The book list is refreshed.
- Dashboard statistics are refreshed.

---

### 🗑️ Delete Book

Users can delete books from their library.

To prevent accidental deletion, the frontend displays a confirmation modal.

**Example:**

```
Delete Book?

Are you sure you want to delete
"Atomic Habits"?

This action cannot be undone.

[ Cancel ] [ Delete ]
```

If the user selects Cancel, the book remains unchanged.

If the user confirms Delete:

- The delete request is processed.
- The button displays a loading state.
- The book is removed.
- A success notification is displayed.
- The books list is refreshed.
- Dashboard statistics are refreshed.

---

### 🔎 Search Books

The My Books page includes a search field.

Users can search books by:

- Title
- Author

**Example:**

```
Search books...

[ Atomic ]
```

The results update based on the entered search text.

The search field uses a small delay before refreshing the results so that the application does not send a request for every individual keystroke.

**Example:**

```
User types:

A
At
Ato
Atom
Atomic

    ↓

Search results update
```

---

### 🎯 Filter Books by Reading Status

Users can filter their library based on reading status.

**Available options include:**

- All
- Want to Read
- Reading
- Completed

**Example:**

```
Status

[ Reading ▼ ]
```

- Selecting **Reading** displays books that are currently being read.
- Selecting **Completed** displays completed books.
- Selecting **Want to Read** displays books that the user plans to read.
- Selecting **All** displays all books.

---

### ↕️ Sort Books

Users can sort their library to make it easier to find books.

**Sorting options include:**

- Newest
- Oldest
- Title
- Author

**Example:**

```
Sort By

[ Newest ▼ ]
```

The user can switch sorting at any time and the book list updates accordingly.

---

### 🏷️ Book Tags

Books can contain multiple tags.

Tags are entered using commas.

**Example:**

```
Self Help, Productivity, Habits
```

The frontend displays these as separate tags.

**Example:**

```
[ Self Help ] [ Productivity ] [ Habits ]
```

Tags help users quickly understand the category or purpose of a book.

---

### 📖 Book Reading Status

Every book has one of three reading statuses:

- Want to Read
- Reading
- Completed

The status is displayed on the book card so users can immediately understand their reading progress.

**Example:**

```
Atomic Habits

James Clear

[ Self Help ] [ Productivity ]

Status: Reading
```

The status can be changed either:

- From the Dashboard
- While adding a book
- While editing a book

---

### 📄 Pagination

The My Books page uses pagination when the library contains multiple pages of books.

**Example:**

```
[ Previous ]    1    2    3    [ Next ]
```

Users can:

- Go to the next page
- Go to the previous page
- Select a specific page

The pagination remains visible so users can understand that the library supports multiple pages, even when there is currently only one page.

The current page is highlighted.

**Example:**

```
[ Previous ]   [ 1 ]   2   3   [ Next ]
```

---

### ⏮️ Previous and Next Navigation

The Previous button allows users to return to the previous page.

The Next button moves users to the next page.

Buttons are automatically disabled when navigation is not possible.

**Example — on the first page:**

```
[ Previous - Disabled ]    1    2    [ Next ]
```

**Example — on the last page:**

```
[ Previous ]    1    2    [ Next - Disabled ]
```

---

### 🕳️ Empty State

The application provides a friendly empty state when there are no books to display.

This can happen when:

- The user has not added any books yet.
- Search does not find a matching book.
- A selected status has no books.

**Example:**

```
             📚

        No books found

Your library is empty or no books
match your current search or filter.

          [ Add Book ]
```

This gives the user clear information instead of showing a blank screen.

---

### ⏳ Books Loading State

While books are being loaded, the page displays a loading message.

**Example:**

```
        Loading books...
```

This prevents users from thinking the library is empty while the data is still loading.

---

### ⏳ Book Action Loading States

Loading states are also shown during individual actions.

**Examples:**

- Saving...
- Updating...
- Deleting...

Buttons are disabled while the action is processing to prevent duplicate submissions.

---

## 👤 User Profile Display

The application displays information about the currently logged-in user.

The User Menu shows:

- User icon
- Full Name
- Email

**Example:**

```
┌────────────────────────────┐
│ 👤  John Doe               │
│     john@example.com       │
└────────────────────────────┘
```

The displayed information represents the currently logged-in account.

---

## 🚪 Logout

The Logout option is available from the application sidebar.

**Example:**

```
Dashboard
My Books

----------------

🚪 Logout
```

When the user clicks Logout:

- The logout action is triggered.
- The user receives a success notification.
- The user is redirected to the Sign In page.

After logout, the user must sign in again to access their library.

---

## 🧭 Navigation

The application provides navigation between the main sections.

The sidebar contains:

```
🏠 Dashboard
📚 My Books
──────────────
🚪 Logout
```

The currently selected page is visually highlighted.

**Example** — when the user is on My Books:

```
Dashboard

📚 My Books   ← Active
```

This helps users understand where they are within the application.

---
✨ Frontend Feature Summary

| Feature                   | Available |
| ------------------------- | --------: |
| Sign Up                   |         ✅ |
| Sign In                   |         ✅ |
| Password Show / Hide      |         ✅ |
| Form Validation           |         ✅ |
| Loading States            |         ✅ |
| Toast Notifications       |         ✅ |
| User Information          |         ✅ |
| Logout                    |         ✅ |
| Dashboard                 |         ✅ |
| Reading Statistics        |         ✅ |
| Recent Books              |         ✅ |
| Add Book                  |         ✅ |
| Edit Book                 |         ✅ |
| Delete Book               |         ✅ |
| Search                    |         ✅ |
| Status Filter             |         ✅ |
| Sorting                   |         ✅ |
| Pagination                |         ✅ |
| Empty State               |         ✅ |
| Reading Status Management |         ✅ |
| Responsive UI             |         ✅ |
---