require("dotenv").config();
const Tesseract = require("tesseract.js");

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
