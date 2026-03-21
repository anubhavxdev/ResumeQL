require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const generateRoutes = require("./routes/generateRoutes");
const userRoutes = require("./routes/userRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const helmet = require("helmet");
const app = express();
const paymentRoutes = require("./routes/paymentRoutes");

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
});

app.use("/api/generate", limiter);
app.use("/api/user", userRoutes);
app.use(rateLimiter);
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(express.json({ limit: "1mb" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));