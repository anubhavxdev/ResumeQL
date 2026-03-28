const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

/**
 * User-based Rate Limiting (5 requests per minute)
 * Specifically for the expensive /generate AI endpoint to prevent 
 * bot-based credit draining or system overload.
 */
module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  keyGenerator: (req) => {
    return req.user?.id || req.ip || "unknown-client";
  },
  handler: (req, res) => {
    logger.warn(`User Throttled: ${req.user?.id || req.ip} exceeded generation limit`);
    res.status(429).json({ msg: "Too many generations. Limit is 5 per minute." });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
