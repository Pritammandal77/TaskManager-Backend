# 🗂️ Task Manager Backend (Internship Assignment)

A **production‑style Task Manager Backend** built using **Node.js, Express, MongoDB, JWT Authentication**, and clean architecture principles, with focus on **real‑world backend practices**, scalability, and clean error handling.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User **Registration & Login**
* **JWT‑based authentication** (Access Token + Refresh Token)
* Secure **HTTP‑only cookies** for token storage
* Refresh token mechanism for session persistence
* Logout functionality (clears tokens)

### ✅ Task Management (CRUD)

* Create a new task
* Fetch all tasks (user‑specific)
* Update task status (`pending` → `completed`)
* Delete a task

### 🧠 Clean Architecture

* Modular folder structure
* Controllers, Models, Utils separated properly
* Reusable utility functions

### ⚠️ Custom Error & Response Handling

* Centralized `ApiError` class for consistent error throwing
* Standardized `ApiResponse` class for all success & error responses

### 🛡️ Security Best Practices

* Password hashing using **bcrypt**
* JWT token validation middleware
* Protected routes (tasks accessible only to logged‑in users)

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **cookie‑parser**
* **dotenv**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

```

---

## 🧪 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Pritammandal77/TaskManager-Backend.git
cd TaskManager-Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Server will run on:
👉 `http://localhost:8000`

---

## 🔑 API Overview

### Auth Routes

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/v1/user/register` | Register user        |
| POST   | `/api/v1/user/login`    | Login user           |
| GET    | `/api/v1/user/me`       | Get current user     |
| POST   | `/api/v1/user/refresh`  | Refresh access token |
| POST   | `/api/v1/user/logout`   | Logout user          |

### Task Routes (Protected)

| Method | Endpoint                         | Description        |
| ------ | -------------------------------  | ------------------ |
| POST   | `/api/v1/task/add-task`          | Create task        |
| GET    | `/api/v1/task/get-all-tasks`     | Fetch all tasks    |
| PUT    | `/api/v1/task/update-task`       | Update task status |
| DELETE | `/api/v1/task/delete-task/:id`   | Delete task        |

---

## 📌 Notes for Reviewer

* Deployment was **optional** as per internship task description
* Focus was kept on **backend logic, security, and architecture**
* Frontend consumes this API locally
* Code is written keeping **scalability and production standards** in mind

---

## 👨‍💻 Author

**Pritam Mandal**
Full‑Stack Developer

---

## ⭐ Feedback

If you’re reviewing this project, feedback is highly appreciated 🙌
