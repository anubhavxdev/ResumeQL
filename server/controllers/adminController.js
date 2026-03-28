const User = require("../models/User");
const Resume = require("../models/Resume");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

// --- GET DASHBOARD STATS ---
exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const totalCoins = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$coins" } } }
    ]);

    res.json({
      totalUsers,
      totalResumes,
      activeUsers,
      totalCoins: totalCoins[0]?.total || 0,
      apiUsage: 0 // Placeholder for real usage analytics
    });
  } catch (err) {
    next(err);
  }
};

// --- GET USER LIST (PAGINATED) ---
exports.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    next(err);
  }
};

// --- BLOCK/UNBLOCK USER ---
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.status = status;
    // If blocked, also invalidate session
    if (status === "blocked") {
      user.refreshToken = null;
    }
    await user.save();

    logger.warn(`ADMIN ACTION: User ${user.email} status set to ${status} by Admin ID ${req.user.id}`);
    res.json({ msg: `User ${status} successfully` });

  } catch (err) {
    next(err);
  }
};

// --- TAIL LOG UTILITY ---
const tailLogs = (filename, linesCount = 100) => {
  const filePath = path.join(__dirname, "../logs/", filename);
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, "utf-8");
  return content.trim().split("\n").slice(-linesCount).reverse();
};

// --- GET SECURITY EVENTS ---
exports.getSecurityEvents = (req, res) => {
  try {
    const logs = tailLogs("security.log", 200);
    res.json({ events: logs });
  } catch (err) {
    res.status(500).json({ msg: "Failed to read security logs" });
  }
};

// --- GET ERROR LOGS ---
exports.getErrors = (req, res) => {
  try {
    const logs = tailLogs("error.log", 200);
    res.json({ errors: logs });
  } catch (err) {
    res.status(500).json({ msg: "Failed to read error logs" });
  }
};

// --- GET COMBINED LOGS ---
exports.getLogs = (req, res) => {
  try {
    const logs = tailLogs("combined.log", 200);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ msg: "Failed to read combined logs" });
  }
};

// --- GET SYSTEM HEALTH ---
exports.getHealth = async (req, res) => {
  try {
    const memory = process.memoryUsage();
    res.json({
      status: "Healthy",
      uptimeSeconds: process.uptime(),
      memory: {
        rss: `${Math.round(memory.rss / (1024 * 1024))} MB`,
        heapTotal: `${Math.round(memory.heapTotal / (1024 * 1024))} MB`,
        heapUsed: `${Math.round(memory.heapUsed / (1024 * 1024))} MB`,
      },
      dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
  } catch (err) {
    res.status(500).json({ msg: "Health check failed" });
  }
};const mongoose = require("mongoose");
