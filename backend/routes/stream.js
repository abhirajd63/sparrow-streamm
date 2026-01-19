const express = require("express");
const router = express.Router();
const drive = require("../google/drive");

router.get("/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const driveResponse = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", "video/mp4");
    driveResponse.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
