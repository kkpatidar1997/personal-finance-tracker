# 💰 Personal Finance Tracker

A full-stack personal finance tracker web application built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. Users can register, log in, and track their expenses and monthly budgets by category.

---

## 🚀 Features

- 🔐 **Authentication**

  - User registration and login with JWT-based auth
  - Protected routes for authorized users only

- 💵 **Transaction Management**

  - Add, edit, delete transactions
  - View all transactions for the current month

- 📊 **Monthly Budgets**

  - Set budgets for categories (e.g., Food, Transport, Entertainment)
  - Get all budgets set for the current month

- 📈 **Analytics (Upcoming)**
  - Category-wise pie charts
  - Budget vs actual comparison
  - Monthly spending summary

---

## 🛠️ Tech Stack

**Frontend:**

- React
- React Router DOM
- Axios
- Tailwind CSS
- Day.js

**Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication

---

## 📁 Folder Structure

/client
/pages
Login.jsx
Signup.jsx
Dashboard.jsx
/components
PrivateRoute.jsx
BudgetManager.jsx
/services
api.js
App.jsx
main.jsx

/server
/controllers
authController.js
budgetController.js
/models
User.js
Budget.js
/routes
authRoutes.js
budgetRoutes.js
middleware/
authMiddleware.js
server.js

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

### 💸 Budgets

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | `/api/budget` | Get budgets for user (current month)    |
| POST   | `/api/budget` | Set or update budget for category/month |

> All `/api/budget` routes require the `Authorization: Bearer <token>` header.

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```
