const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // High Security: Check DB for user status & role every time
    // Optional: for performance, just use 'decoded' if role is in JWT
    const user = await User.findById(decoded.id).select("role status");
    
    if (!user || user.status === "blocked") {
       return res.status(403).json({ msg: "Access revoked or user not found" });
    }

    req.user = {
      id: decoded.id,
      role: user.role,
      status: user.status
    };
    
    next();

  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};