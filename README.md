# 🔐 User Authentication Module (MERN Stack + Google OAuth2)

This project is a complete user authentication module built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It supports **email/password-based login/registration** and **Google OAuth2 login**. The app is built for training under Websphere Solution Pvt. Ltd.

---

## 🛠 Tech Stack

- **Frontend:** React.js (Vite + Tailwind CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token), bcryptjs, Google OAuth2
- **Environment Configuration:** dotenv

---

## 📁 Project Structure

```
auth-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Register, Login pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── server/                 # Express backend
│   ├── config/             # DB & Google OAuth setup
│   ├── controllers/        # Auth logic
│   ├── models/             # Mongoose User schema
│   ├── routes/             # API routes
│   ├── middleware/         # JWT verification
│   └── index.js
└── .env
```

---

## 🚀 Features

- 🔐 Register with email & password
- 🔐 Login with email & password
- 🔐 Sign in with Google account
- 🔐 JWT-based authentication
- 🔐 Passwords hashed using bcryptjs
- 🧠 Input validation
- 🧳 Environment variable config

---

## 🧑‍💻 Installation and Setup

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/yourusername/auth-app.git
cd auth-app
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Run the React app:

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Route             | Description                  |
|--------|------------------|------------------------------|
| POST   | /api/auth/register | Register a new user         |
| POST   | /api/auth/login    | Login with credentials      |
| GET    | /api/auth/google   | Start Google OAuth flow     |
| GET    | /api/auth/profile  | Get logged-in user profile  |

---

## 🌐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and configure OAuth2 consent screen
3. Generate **Client ID** and **Client Secret**
4. Add redirect URL: `http://localhost:5000/api/auth/google/callback`

---

## 📷 Screenshots *(Optional)*

You can add UI screenshots here:

- Register Page
- Login Page
- Google Sign-In

---

## 🙋‍♂️ Author

- **Name:** Sagar Goswami
- **Role:** Full Stack Developer ( Websphere Solution Pvt. Ltd.)
- **LinkedIn:** [www.linkedin.com/in/sagar-goswami2003]
- **GitHub:** [[Your GitHub](https://github.com/goswamisagar)]

---

## 📃 License

This project is licensed under the MIT License.
