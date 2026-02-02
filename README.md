# 3WBussiness - Social Feed Application

A modern, mobile-first social feed application built with React, Node.js, and MongoDB. This project features a TaskPlanet-style UI with real-time interactions, image uploads, and full user authentication.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT.
- **Mobile-First UI**: Responsive design matching professional social feed mockups.
- **Social Interactions**:
  - Create posts with text, images, or both.
  - Like posts and see real-time counts.
  - Comment on posts with username tracking.
- **Image Uploads**: Powered by Multer for actual file storage on the backend.
- **Search & Filter**: Search posts by content and filter by Top, Trending, or Latest.
- **Database Driven**: Fully persistent data stored in MongoDB Atlas.

## 🛠️ Tech Stack

- **Frontend**: React.js, Material UI (MUI), Vite, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas with Mongoose.
- **Authentication**: JSON Web Tokens (JWT) & Bcryptjs.
- **File Handling**: Multer for local image storage.

## 📦 Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas account and connection string.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder:
   ```env
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
3WBussiness/
├── backend/
│   ├── controllers/   # API logic
│   ├── middleware/    # Auth and Upload handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── uploads/       # Stored images
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Login/Signup pages
│   │   ├── services/   # API communication
│   │   └── App.jsx     # Main application logic
│   └── vite.config.js
└── README.md
```

## 🛡️ License
This project is open-source and available for educational purposes.
