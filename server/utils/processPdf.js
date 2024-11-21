require("dotenv").config();
const fs = require("fs");
const pdfParse = require("pdf-parse");

const processPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);

  return pdfData;
};

module.exports = processPdf;
