const express = require("express");
const drive = require("../google/drive");
const router = express.Router();

// GET: /api/videos
router.get("/", async (req, res) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name, mimeType)",
    });

    // Optional: filter only videos
    const videos = response.data.files.filter(file =>
      file.mimeType.startsWith("video/")
    );

    res.json(videos);

  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;