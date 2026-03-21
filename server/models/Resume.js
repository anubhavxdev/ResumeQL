const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cv: String,
  jd: String,
  latex: String,
  updatedLatex: String
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);