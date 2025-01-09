const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const { notFound, errorHandler } = require("./middleware/errorHandler");

const AuthRouter = require("./route/authRoute");
const UserRouter = require("./route/userRoute");
const AdminRouter = require("./route/adminRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Local testing
  "https://event-booking-app-client.onrender.com", // Production frontend
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["Authorization"], // Expose Authorization header
  })
);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my_secret_key", // Use .env for secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // True for HTTPS in production
      httpOnly: true, // Prevents client-side JavaScript from accessing cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Route Handlers
app.use(AuthRouter);
app.use(UserRouter);
app.use(AdminRouter);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
