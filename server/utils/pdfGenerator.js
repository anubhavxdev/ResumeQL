const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

exports.generatePDF = (latexContent) => {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    const dir = path.join(__dirname, "../temp", id);

    fs.mkdirSync(dir, { recursive: true });

    const texFile = path.join(dir, "resume.tex");

    fs.writeFileSync(texFile, latexContent);

    // Run latexmk
    exec(`latexmk -pdf -interaction=nonstopmode resume.tex`, { cwd: dir }, (err) => {
      if (err) {
        return reject("PDF generation failed");
      }

      const pdfPath = path.join(dir, "resume.pdf");

      resolve({
        pdfPath,
        dir
      });
    });
  });
};