const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      totalResumes: user.resumesGenerated,
      coinsLeft: user.coins
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};