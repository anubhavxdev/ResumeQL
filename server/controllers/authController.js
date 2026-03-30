const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");

// Helper: Hash Refresh Token (SHA-256)
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// Helper: Generate Access and Refresh Tokens
const generateTokens = (id, role) => {
  const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// --- SIGNUP ---
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, registrationNumber, year } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      registrationNumber,
      year,
      coins: 100,
      isLPU: registrationNumber?.startsWith("LPU"),
      role: "user", // Default
      status: "active"
    });

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);
    
    // Hash and save refresh token to DB
    user.refreshToken = hashToken(refreshToken);
    await user.save();

    logger.info(`User Registered: ${user._id} | Role: ${user.role}`);

    // Set Refresh Token in HttpOnly Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();
    res.status(201).json({ accessToken, user: safeUser });

  } catch (err) {
    next(err);
  }
};

// --- LOGIN ---
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    if (user.status === "blocked") {
      logger.warn(`Blocked User Access Attempt: ${user.email}`);
      return res.status(403).json({ msg: "Account is suspended. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    // Hash and save (Rotation)
    user.refreshToken = hashToken(refreshToken);
    await user.save();

    logger.info(`User Logged In: ${user._id} | Role: ${user.role}`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();
    res.json({ accessToken, user: safeUser });

  } catch (err) {
    next(err);
  }
};

// --- REFRESH TOKEN (With Reuse Detection) ---
exports.refresh = async (req, res, next) => {
  const cookieToken = req.cookies.refreshToken;
  if (!cookieToken) return res.status(401).json({ msg: "Authentication required" });

  try {
    const decoded = jwt.verify(cookieToken, process.env.REFRESH_SECRET || process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.status === "blocked") {
      res.clearCookie("refreshToken");
      return res.status(401).json({ msg: "Session revoked or account blocked" });
    }

    const hashedInput = hashToken(cookieToken);

    // REUSE DETECTION ENGINE
    if (hashedInput !== user.refreshToken) {
      logger.warn(`REFRESH TOKEN REUSE DETECTED: User ${user._id}. Revoking ALL sessions.`);
      
      // Revoke all sessions for this user (Clear refreshToken field)
      user.refreshToken = null;
      await user.save();

      res.clearCookie("refreshToken");
      return res.status(403).json({ msg: "Security violation: Compromised session revoked" });
    }

    // ROTATION: Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id, user.role);
    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

  } catch (err) {
    logger.error("Refresh Error:", err.message);
    res.status(401).json({ msg: "Token validation failed" });
  }
};

// --- LOGOUT ---
exports.logout = async (req, res, next) => {
  const cookieToken = req.cookies.refreshToken;
  try {
    if (cookieToken) {
      const hashedInput = hashToken(cookieToken);
      await User.findOneAndUpdate({ refreshToken: hashedInput }, { refreshToken: null });
      logger.info("User Logout Success");
    }
    res.clearCookie("refreshToken");
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

// --- FORGOT PASSWORD ---
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User with this email does not exist" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Hash and save token to user model
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // In a real app, send an email. For now, we log it.
    const resetUrl = `${req.get("origin")}/reset-password/${resetToken}`;
    
    logger.info(`PASSWORD RESET REQUESTED: ${user.email} | URL: ${resetUrl}`);
    
    // Mocking email send
    console.log("-----------------------------------------");
    console.log(`To: ${user.email}`);
    console.log(`Subject: Password Reset Request`);
    console.log(`Link: ${resetUrl}`);
    console.log("-----------------------------------------");

    res.json({ msg: "Reset link generated and sent to email (simulated)" });

  } catch (err) {
    next(err);
  }
};

// --- RESET PASSWORD ---
exports.resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    // Set new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    logger.info(`Password successfully reset for user: ${user._id}`);
    res.json({ msg: "Password recovery successful. Please login with your new credentials." });

  } catch (err) {
    next(err);
  }
};