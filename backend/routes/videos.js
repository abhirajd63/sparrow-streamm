const express = require("express");
const drive = require("../google/drive");

const router = express.Router();

// List videos
router.get("/", async (req, res) => {
  try {
    const response = await drive.files.list({
      q: "mimeType contains 'video/'",
      fields: "files(id, name)",
    });
    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stream video
router.get("/stream/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const driveResponse = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    driveResponse.data.pipe(res);
  } catch (err) {
    res.status(500).send("Streaming error");
  }
});

// Download video
router.get("/download/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const driveResponse = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Disposition", "attachment");
    driveResponse.data.pipe(res);
  } catch (err) {
    res.status(500).send("Download error");
  }
});

module.exports = router;
