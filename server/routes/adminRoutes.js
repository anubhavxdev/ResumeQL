const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  getStats,
  getUsers,
  updateUserStatus,
  getSecurityEvents,
  getErrors,
  getLogs,
  getHealth
} = require("../controllers/adminController");

// ALL routes are protected by AUTH + ADMIN
router.use(auth);
router.use(admin);

// Dashboard & Stats
router.get("/stats", getStats);

// User Management
router.get("/users", getUsers);
router.patch("/users/:id/status", updateUserStatus);

// Logging & Security
router.get("/security-events", getSecurityEvents);
router.get("/errors", getErrors);
router.get("/logs", getLogs);

// System Performance
router.get("/health", getHealth);

module.exports = router;
