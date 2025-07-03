# 📚 Library Management System API

A full-featured backend API for managing a library system. Built with **Express.js**, **TypeScript**, and **MongoDB**, this system enables users to manage books, borrowing operations, and view summarized borrowing data. Ideal for institutions or developers looking to implement a digital library backend.

---

## 🚀 Live URLs

- 🌐 Frontend (React): [Visit Client](https://magenta-semolina-d5b4b9.netlify.app/)
- 🔗 Backend API (Vercel): [Visit Deployed API](https://libraraywithui.vercel.app/)

---

## 📌 Features

- 📖 **Book Management**

  - Create, read, update, and delete books
  - View by ID
  - Supports dynamic availability tracking

- 🔁 **Borrowing System**

  - Borrow books with quantity and due date
  - Reduces available copies automatically

- 📊 **Borrow Summary**
  - Aggregated summary of borrowed books
  - Includes book title, ISBN, and total borrowed count

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js** – Backend framework
- **TypeScript** – Type-safe development
- **MongoDB** with **Mongoose** – Database and ODM
- **Vercel** – Serverless deployment
- **ESLint** – Code formatting
- **dotenv** – Environment variable management

---

## 📦 Project Setup (Backend)

### 1. Clone the repository

```bash
git clone https://github.com/zahidhasanratan/Library-Management-Server.git
cd Library-Management-Server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/libraryDB
```

### 4. Build TypeScript

```bash
npm run build
```

### 5. Start the server (for local development)

```bash
npm start
```

---

## 🔌 API Endpoints

### 📘 Books

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/books`     | Get all books     |
| GET    | `/api/books/:id` | Get book by ID    |
| POST   | `/api/books`     | Create a new book |
| PATCH  | `/api/books/:id` | Update a book     |
| DELETE | `/api/books/:id` | Delete a book     |

### 📦 Borrowing

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| POST   | `/api/borrows/:id`     | Borrow a book by ID         |
| GET    | `/api/borrows/summary` | Get borrowed summary report |

---

## ✅ Deployment Notes

- Hosted on **Vercel** using a serverless-compatible Express export
- Main Express app resides in `/api/server.ts`
- `vercel.json` includes route rewrites for API handling

---

## 📊 Testing (Optional)

To test the API:

- Use [Postman](https://postman.com/) or cURL to hit endpoints
- Example:

```bash
curl https://libraraywithui.vercel.app/api/books
```

---

## 📁 Related Repositories

- 🎨 **Frontend React App**: [Library Management Client](https://github.com/zahidhasanratan/Library-Management-Client)
- 🧠 **Backend Express API**: [Library Management Server](https://github.com/zahidhasanratan/Library-Management-Server)

---

## 🛋️ Contact

For questions, contact [@zahidhasanratan](https://github.com/zahidhasanratan)
