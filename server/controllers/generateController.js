const { generatePDF } = require("../utils/pdfGenerator");
const fs = require("fs");
const { calculateATS } = require("../utils/ats");
const { generateContent } = require("../utils/gemini");
const { buildPrompt } = require("../utils/promptEngine");
const User = require("../models/User");
const Resume = require("../models/Resume");

// 📄 DOWNLOAD PDF (Secure Compiling)
exports.downloadResumePDF = async (req, res, next) => {
  try {
    const { latex } = req.body;
    
    // Strict Input Validation
    if (!latex || typeof latex !== "string") {
      return res.status(400).json({ msg: "Valid LaTeX source content required" });
    }

    if (latex.length > 100000) {
      return res.status(400).json({ msg: "LaTeX content size exceeds safety limits" });
    }

    // Call secure spawning utility
    const { pdfPath, dir } = await generatePDF(latex);

    res.download(pdfPath, "resume.pdf", (err) => {
      // Cleanup happens regardless of download success
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch (cleanupErr) {
        console.error("Temp cleanup error:", cleanupErr);
      }
      
      if (err && !res.headersSent) {
        next(err);
      }
    });

  } catch (err) {
    next(err);
  }
};

// 📊 GET ATS SCORE & SUGGESTIONS
exports.getATSScore = async (req, res, next) => {
  try {
    const cv = String(req.body.cv || "");
    const jd = String(req.body.jd || "");

    if (!cv || !jd || cv.length < 50 || jd.length < 50) {
      return res.status(400).json({ msg: "Sufficient CV and JD content required for analysis" });
    }

    const result = calculateATS(cv, jd);
    const prompt = buildPrompt(cv, jd);

    // AI Generation (Primary attempt)
    let suggestions;
    try {
      suggestions = await generateContent(prompt);
    } catch (aiErr) {
      console.error("AI Analysis Error:", aiErr);
      return res.status(503).json({ msg: "AI Analysis temporarily unavailable. Core ATS score ready.", ...result });
    }

    // Clean output: Remove markdown artifacts
    const cleaned = suggestions
      .replace(/```latex/g, "")
      .replace(/```/g, "")
      .trim();

    res.json({
      success: true,
      ...result,
      suggestions: cleaned
    });

  } catch (err) {
    next(err);
  }
};

// ✨ GENERATE AI RESUME (CREDIT-PROTECTED)
exports.generateResume = async (req, res, next) => {
  try {
    const cv = String(req.body.cv || "");
    const jd = String(req.body.jd || "");
    const userId = req.user.id;

    if (!cv || !jd) {
      return res.status(400).json({ msg: "Both profile content and job description are required" });
    }

    // Explicit User verification with coin balance (Locked to authenticated userId)
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ msg: "Identity verification failed" });

    if (user.coins < 50) {
      return res.status(403).json({ msg: "Insufficient credits for high-fidelity generation" });
    }

    const prompt = buildPrompt(cv, jd);

    // AI Generation
    let updatedLatex;
    try {
      updatedLatex = await generateContent(prompt);
    } catch (aiErr) {
      return res.status(503).json({ msg: "The AI architect is currently over capacity. Try again in 60s." });
    }

    // Clean markdown artifacts
    const cleaned = updatedLatex
      .replace(/```latex/g, "")
      .replace(/```/g, "")
      .trim();

    // Final Validation of output
    if (!cleaned.includes("\\document") && cleaned.length < 500) {
       return res.status(500).json({ msg: "AI returned a truncated response. No credits were deducted." });
    }

    // Atomic Balance Update
    user.coins -= 50;
    user.resumesGenerated += 1;
    await user.save();

    // Persistent storage (Bound to userId)
    const savedResume = await Resume.create({
      userId,
      cv,
      jd,
      updatedLatex: cleaned
    });

    res.json({
      updatedLatex: cleaned,
      coinsLeft: user.coins,
      id: savedResume._id
    });

  } catch (err) {
    next(err);
  }
};

// 🏁 FETCH HISTORY (ULAC ENFORCED)
exports.getUserResumes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Strict binding to req.user.id ensures no user can see another's history
    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("-__v");

    res.json({ resumes });
  } catch (err) {
    next(err);
  }
};