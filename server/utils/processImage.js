require("dotenv").config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Tesseract = require("tesseract.js");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const processImage = async (filePath) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(filePath, "eng", {
      // logger: (m) => console.log(m),
    });

    return text;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

module.exports = processImage;
