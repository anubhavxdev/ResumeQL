const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");

/**
 * Strictly sanitizes LaTeX content to prevent command injection
 * and malicious TeX features.
 */
const sanitizeLatex = (content) => {
  if (typeof content !== "string") return "";
  
  // Block TeX primitive command execution and file system access
  const dangerousPatterns = [
    /\\write18/gi,    // Shell escape
    /\\input/gi,      // File inclusion
    /\\include/gi,    // File inclusion
    /\\read/gi,       // File reading
    /\\openin/gi,     // File opening
    /\\openout/gi,    // File writing
    /\\catcode/gi,    // Character code manipulation
    /\\immediate/gi,  // Immediate execution (often with write18)
    /\\special/gi     // DVI drivers/external calls
  ];

  let sanitized = content;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, "[REDACTED]");
  });

  return sanitized;
};

exports.generatePDF = (latexContent) => {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    const dir = path.join(__dirname, "../temp", id);
    const sanitizedContent = sanitizeLatex(latexContent);

    try {
      fs.mkdirSync(dir, { recursive: true });
      const texFile = path.join(dir, "resume.tex");
      fs.writeFileSync(texFile, sanitizedContent);

      // Using spawn for safer process execution (no shell interpolation)
      const process = spawn("latexmk", [
        "-pdf",
        "-interaction=nonstopmode",
        "resume.tex"
      ], { 
        cwd: dir,
        timeout: 40000, // 40s timeout to prevent zombie processes
        env: { ...process.env, PATH: process.env.PATH } // Isolated environment
      });

      let errorOutput = "";

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", (code) => {
        if (code !== 0) {
          console.error("LaTeX Compiling Error:", errorOutput);
          return reject(new Error("PDF generation failed during compilation"));
        }

        const pdfPath = path.join(dir, "resume.pdf");
        if (!fs.existsSync(pdfPath)) {
          return reject(new Error("Output PDF not found"));
        }

        resolve({ pdfPath, dir });
      });

      process.on("error", (err) => {
        console.error("Spawn Error:", err);
        reject(new Error("LaTeX compiler (latexmk) is not available or failed to start"));
      });

    } catch (err) {
      console.error("PDF Prep Error:", err);
      reject(err);
    }
  });
};