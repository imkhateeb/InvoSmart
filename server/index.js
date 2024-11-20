const express = require("express");
const multer = require("multer");
const cors = require("cors");
const processFiles = require("./utils/processFiles");
require("dotenv").config();
const { generateJSON } = require("./utils/test");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" }).any();

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    msg: "Server running",
    data: null,
    error: null,
  });
});

app.post("/process", upload, async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const processedResults = await processFiles(files);
    const response = await generateJSON(processedResults);

    if (!processedResults) {
      return res.status(400).json({
        success: false,
        msg: "Failed to process files",
        data: null,
        error: "The files are not processed",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Files processed successfully",
      data: response,
      error: null,
    });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to process files",
      data: null,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
