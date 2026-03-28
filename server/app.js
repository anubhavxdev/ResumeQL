require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const generateRoutes = require("./routes/generateRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

// --- HTTP Request Logging (Morgan) ---
app.use(morgan("dev", {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// --- Security Layer ---
app.use(helmet());
app.use(cookieParser());

// Strict CORS Whitelist
const whitelist = [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:4173"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Request Payload & Timeout limits
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use((req, res, next) => {
  res.setTimeout(45000, () => {
    res.status(408).send({ msg: "Request timeout. Heavy operations like PDF generation might take time." });
  });
  next();
});

// --- Global Rate Limiting (IP-Based) ---
app.use(rateLimiter);

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

// --- Global Error Handler (Production-Ready) ---
app.use((err, req, res, next) => {
  // Log Error via Winston
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  if (err.name === "ValidationError") {
    return res.status(400).json({ msg: "Validation failed", errors: err.errors });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ msg: "Access denied by security policy" });
  }

  res.status(err.status || 500).json({
    msg: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message || "An unexpected error occurred"
  });
});

const http = require("http");
const socketService = require("./utils/socketService");

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info("DB Connected Successfully"))
  .catch(err => {
    logger.error("Critical DB failure:", err);
    process.exit(1);
  });

const server = http.createServer(app);
const io = socketService.init(server);

// Attach Logger to Socket Emitter (Real-time Logs)
logger.attachSocket(socketService);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Secure Real-Time Server Running on Port ${PORT}`));