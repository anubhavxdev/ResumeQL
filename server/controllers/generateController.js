const { generatePDF } = require("../utils/pdfGenerator");
const fs = require("fs");
const { calculateATS } = require("../utils/ats");
const { generateContent } = require("../utils/gemini");
const { buildPrompt } = require("../utils/promptEngine");
const User = require("../models/User");
const Resume = require("../models/Resume");

exports.downloadResumePDF = async (req, res) => {
  try {
    const { latex } = req.body;

    if (!latex) {
      return res.status(400).json({ msg: "Latex required" });
    }
    //limit latex input size to prevent abuse
    if (latex.length > 50000) {
      return res.status(400).json({ msg: "Latex too large" });
    }

    //prevent injection
    if (latex.includes("\\write18")) {
      return res.status(400).json({ msg: "Unsafe LaTeX" });
    }

    const { pdfPath, dir } = await generatePDF(latex);

    res.download(pdfPath, "resume.pdf", (err) => {
      if (err) {
        console.error(err);
      }

      // Cleanup temp files
      fs.rmSync(dir, { recursive: true, force: true });
    });

  } catch (err) {
    res.status(500).json({ msg: "PDF generation failed" });
  }
};

exports.getATSScore = async (req, res) => {
  try {
    const { cv, jd } = req.body;

    if (!cv || !jd) {
      return res.status(400).json({ msg: "CV and JD required" });
    }

    const result = calculateATS(cv, jd);

    // FIX: getATSScore does not use latex — pass cv as the resume content for prompt
    const prompt = buildPrompt(cv, jd);

    let suggestions;
    for (let i = 0; i < 2; i++) {
      try {
        suggestions = await generateContent(prompt);
        break;
      } catch (err) {
        if (i === 1) throw err;
      }
    }

    // Clean output: Remove markdown code blocks
    const cleaned = suggestions
      .replace(/```latex/g, "")
      .replace(/```/g, "")
      .trim();
    suggestions = cleaned;

    res.json({
      success: true,
      ...result,
      suggestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "ATS failed", error: err.message });
  }
};

exports.generateResume = async (req, res) => {
  try {
    const { cv, jd } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.coins < 50) {
      return res.status(400).json({ msg: "Not enough coins" });
    }

    const prompt = buildPrompt(cv, jd);

    let updatedLatex;
    for (let i = 0; i < 2; i++) {
      try {
        updatedLatex = await generateContent(prompt);
        break;
      } catch (err) {
        if (i === 1) throw err;
      }
    }

    // Clean output: Remove markdown code blocks
    const cleaned = updatedLatex
      .replace(/```latex/g, "")
      .replace(/```/g, "")
      .trim();
    updatedLatex = cleaned;

    // Run ATS again and regenerate if score is low
    const newScore = calculateATS(updatedLatex, jd);
    const ATS_THRESHOLD = 70;

    if (newScore.score < ATS_THRESHOLD) {
      // Regenerate with retry
      let retryLatex;
      for (let i = 0; i < 2; i++) {
        try {
          retryLatex = await generateContent(prompt);
          break;
        } catch (err) {
          if (i === 1) throw err;
        }
      }

      // Clean retry output
      const cleanedRetry = retryLatex
        .replace(/```latex/g, "")
        .replace(/```/g, "")
        .trim();
      updatedLatex = cleanedRetry;
    }

    user.coins -= 50;
    user.resumesGenerated += 1;
    await user.save();

    await Resume.create({
      userId: user._id,
      cv,
      jd,
      updatedLatex
    });

    res.json({
      updatedLatex,
      coinsLeft: user.coins
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({ resumes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch resume history" });
  }
};