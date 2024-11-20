const processPdf = require("./processPdf");
const processImage = require("./processImage");
const processExcel = require("./processExcel");
const fs = require("fs");
const path = require("path");
const structureExtractedData = require("./structureExtractedData");

const processFiles = async (files) => {
  const results = [];

  for (const file of files) {
    const filePath = file.path;
    const fileType = path.extname(file.originalname).toLowerCase();

    if (fileType === ".pdf") {
      const pdfResult = await processPdf(filePath);
      results.push(pdfResult);
    } else if ([".png", ".jpg", ".jpeg"].includes(fileType)) {
      const imageResult = await processImage(filePath);
      results.push(imageResult);
    } else if (fileType === ".xlsx") {
      const excelResult = await processExcel(filePath);
      results.push(excelResult);
    } else {
      console.log(`Unsupported file type: ${fileType}`);
    }

    fs.unlinkSync(filePath);
  }
  if (!results.length) {
    return null;
  }
  // console.log(results);

  // const response = structureExtractedData(results);
  // console.log(response);

  return results;
};

module.exports = processFiles;
