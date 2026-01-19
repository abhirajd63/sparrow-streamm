const express = require("express");
const router = express.Router();
const drive = require("../google/drive");

router.get("/list", async (req, res) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id,name,mimeType,thumbnailLink,description)",
    });

    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
