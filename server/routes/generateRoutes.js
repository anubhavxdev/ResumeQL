const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { downloadResumePDF } = require("../controllers/generateController");
const { getATSScore } = require("../controllers/generateController");
const {
  generateResume,
  getUserResumes
} = require("../controllers/generateController");

router.post("/generate", auth, generateResume);
router.get("/history", auth, getUserResumes);
router.post("/download-pdf", auth, downloadResumePDF);
router.post("/ats-score", auth, getATSScore);

module.exports = router;