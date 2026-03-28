const logger = require("../utils/logger");

/**
 * Custom Header-Based CSRF Protection
 * Since we use HTTP-Only cookies for refresh tokens, we must guard 
 * against CSRF by enforcing a custom header that cannot be set 
 * across origins by standard browsers/forms.
 */
module.exports = (req, res, next) => {
  const allowedHeaders = ["x-csrf-token", "x-requested-with"];
  const hasCustomHeader = allowedHeaders.some(h => req.headers[h]);

  if (!hasCustomHeader) {
     logger.warn(`Potential CSRF Attempt: Missing custom header from ${req.ip}`);
     return res.status(403).json({ msg: "Security violation: Missing custom CSRF headers" });
  }

  next();
};
