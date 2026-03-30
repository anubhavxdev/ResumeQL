const express = require("express");
const { body } = require("express-validator");
const { signup, login, refresh, logout, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

// Validation Rules
const signupValidation = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
  body("name").notEmpty().trim().escape(),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

const csrfGuard = require("../middleware/csrfGuard");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/refresh", csrfGuard, refresh);
router.post("/logout", csrfGuard, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;