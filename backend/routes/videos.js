const express = require("express");
const drive = require("../google/drive");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;

    const result = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'video/'`,
      fields: "files(id,name,mimeType,thumbnailLink)",
    });

    res.json(result.data.files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;
