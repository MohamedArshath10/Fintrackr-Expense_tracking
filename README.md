<div align="center">

# Fintrackr

### A full-stack personal finance tracker to manage your income, expenses, and savings — all in one place.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://fintrackr-expense-tracking.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with bcrypt password hashing and token-based auth
- 📊 **Interactive Dashboard** — Real-time balance, income vs expense summary, and recent transactions
- 💵 **Income Tracking** — Add, view, and delete income sources with date and icon
- 💸 **Expense Tracking** — Log expenses by category with full history
- 📈 **Bar Chart Visualization** — Visual income/expense trends powered by Recharts
- 📥 **Excel Export** — Download income and expense history as `.xlsx` files
- 🖼️ **Profile Image Upload** — Upload profile pictures via Multer
- 🔒 **Protected Routes** — JWT-based protection on both frontend and backend
- 📅 **60/30-Day Analytics** — Last 60-day income and last 30-day expense summaries on the dashboard

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing and protected routes |
| Context API | Global user state management |
| Axios | HTTP client with request/response interceptors |
| Recharts | Bar chart visualizations |
| React Hot Toast | Notification toasts |
| Tailwind CSS | Utility-first styling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | Profile image upload handling |
| xlsx | Excel file generation |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🏗️ Project Structure

Fintrackr/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controller/
│   │   ├── authController.js      # Register, Login, GetUser
│   │   ├── incomeController.js    # Add, Get, Delete, Download income
│   │   ├── expenseController.js   # Add, Get, Delete, Download expense
│   │   └── dashboardController.js # Aggregated dashboard data
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect middleware
│   │   └── uploadMiddleware.js    # Multer file upload config
│   ├── models/
│   │   ├── User.js                # User schema with bcrypt hooks
│   │   ├── Income.js              # Income schema
│   │   └── Expense.js             # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── incomeRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── dashboardRoutes.js
│   ├── uploads/                   # Stored profile images
│   └── server.js                  # Express app entry point
│
└── Frontend/
└── src/
├── Pages/
│   ├── Auth/              # Login and SignUp pages
│   └── Dashboard/         # Home, Income, Expense pages
├── Components/
│   └── Charts/            # CustomBarChart component
├── Context/
│   └── useContext.js      # UserContext and UserProvider
├── Utils/
│   ├── axiosInstance.js   # Axios config with interceptors
│   ├── apiPaths.js        # Centralized API endpoints
│   └── helper.js          # Chart data helper functions
└── App.jsx                # Routes and Root auth guard
---

## 🔌 API Reference

### Auth — `/api/v1/auth`

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/register` | ❌ | Register a new user |
| POST | `/login` | ❌ | Login and receive JWT token |
| GET | `/getUser` | ✅ | Get logged-in user info |
| POST | `/upload-image` | ❌ | Upload profile image |

### Income — `/api/v1/income`

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/add` | ✅ | Add a new income entry |
| GET | `/get` | ✅ | Get all income entries for user |
| DELETE | `/:id` | ✅ | Delete an income entry |
| GET | `/downloadexcel` | ✅ | Download income history as Excel |

### Expense — `/api/v1/expense`

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/add` | ✅ | Add a new expense entry |
| GET | `/get` | ✅ | Get all expense entries for user |
| DELETE | `/:id` | ✅ | Delete an expense entry |
| GET | `/downloadexcel` | ✅ | Download expense history as Excel |

### Dashboard — `/api/v1/dashboard`

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | `/` | ✅ | Total balance, income, expense, trends, recent transactions |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/MohamedArshath10/Fintrackr-Expense_tracking.git
cd Fintrackr-Expense_tracking
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔐 How Authentication Works

User registers or logs in
↓
Server generates JWT token (expires in 1 hour)
↓
Token stored in localStorage on the frontend
↓
Axios interceptor attaches token to every outgoing request
↓
protect middleware on backend verifies the token
↓
req.user is set → controller fetches only that user's data
---

## 📊 Dashboard Data

The dashboard computes the following in a single API call:

- **Total Balance** = Total Income − Total Expense
- **Total Income** — aggregated sum of all income entries
- **Total Expense** — aggregated sum of all expense entries
- **Last 60-Day Income** — income transactions from the past 60 days
- **Last 30-Day Expenses** — expense transactions from the past 30 days
- **Recent Transactions** — last 5 income + last 5 expense merged and sorted by date

---

## 🚀 Deployment

### Frontend — Vercel
1. Push the `Frontend/` folder to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set build command: `npm run build`, output directory: `dist`

### Backend — Render
1. Push the `Backend/` folder to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Set start command: `node server.js`
4. Add environment variables: `MONGO_URL`, `JWT_SECRET`, `PORT`, `CLIENT_URL`

---

## 🌱 Future Improvements

- [ ] Switch to `httpOnly` cookies for more secure token storage
- [ ] Add token refresh logic to prevent session expiry
- [ ] Add budget limits with overspend alerts
- [ ] Migrate file uploads to Cloudinary for persistent storage
- [ ] Add pie chart breakdown by category
- [ ] Add unit tests with Jest and Supertest
- [ ] Add pagination for large transaction lists

---

## 👨‍💻 Author

**Mohamed Arshath**
- LinkedIn: [mohamedarshathm](https://www.linkedin.com/in/mohamedarshathm)
- GitHub: [MohamedArshath10](https://github.com/MohamedArshath10)
- Email: arshath.m2003@gmail.com

---

<div align="center">
⭐ If you found this project useful, consider giving it a star!
</div>
