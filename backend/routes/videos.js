const express = require("express");
const router = express.Router();
const drive = require("../google/drive");

router.get("/", async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'${process.env.DRIVE_FOLDER_ID}' in parents and mimeType contains 'video/'`,
      fields: "files(id, name, mimeType, thumbnailLink)",
    });

    res.json(response.data.files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;
