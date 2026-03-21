const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getProfile, getAnalytics } = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.get("/analytics", auth, getAnalytics);

module.exports = router;