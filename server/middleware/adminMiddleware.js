/**
 * Admin Middleware
 * 
 * Verifies that the user has the 'admin' role. 
 * Must be placed AFTER authMiddleware.
 */
module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Administrative access required" });
  }
  next();
};
