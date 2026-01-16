const express = require("express");
const drive = require("../google/drive");

const router = express.Router();

/**
 * LIST VIDEOS FROM GOOGLE DRIVE FOLDER
 */
router.get("/videos", async (req, res) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'video/'`,
      fields: "files(id, name, mimeType)",
    });

    res.json(response.data.files);
  } catch (err) {
    console.error("LIST ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * STREAM VIDEO FROM GOOGLE DRIVE
 */
router.get("/stream/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    // Get file metadata
    const meta = await drive.files.get({
      fileId,
      fields: "name, mimeType",
    });

    const mimeType = meta.data.mimeType || "application/octet-stream";

    // Set proper content type
    res.setHeader("Content-Type", mimeType);

    // Stream video
    const driveStream = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    driveStream.data.pipe(res);
  } catch (err) {
    console.error("STREAM ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
