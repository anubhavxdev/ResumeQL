const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  registrationNumber: String,
  year: String,

  coins: { type: Number, default: 100 },
  resumesGenerated: { type: Number, default: 0 },

  isLPU: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  refreshToken: { type: String, select: false }, // Stored as a hash or token string
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);    