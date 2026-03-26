require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const generateRoutes = require("./routes/generateRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

// --- Security Middleware (applied first) ---
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json({ limit: "1mb" }));

// --- Global rate limiter ---
app.use(rateLimiter);

// --- Per-route rate limiter for expensive AI endpoint ---
const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests to generate endpoint, try again later"
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/generate", generateLimiter, generateRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

// --- Database connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));