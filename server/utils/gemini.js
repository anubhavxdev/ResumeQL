const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateContent = async (prompt) => {
  try {
    console.log("Entering generateContent...");
    console.log("Model: gemini-2.5-flash");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("Calling model.generateContent...");
    const result = await model.generateContent(prompt);
    console.log("Gemini SUCCESS");

    return result.response.text().trim();

  } catch (err) {
    console.error("GEMINI_ERROR_DETAILS:", {
      message: err.message,
      stack: err.stack,
      status: err.status,
    });
    throw new Error(`AI generation failed: ${err.message}`);
  }
};