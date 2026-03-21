const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);

    return result.response.text().trim();

  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("AI generation failed");
  }
};