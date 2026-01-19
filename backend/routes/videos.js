const express = require("express");
const router = express.Router();
const drive = require("../google/drive");

/* =========================
   LIST VIDEOS
========================= */
router.get("/videos/list", async (req, res) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id,name,mimeType,thumbnailLink)",
    });

    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   STREAM VIDEO (VLC STYLE)
========================= */
router.get("/stream/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const range = req.headers.range;

    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const meta = await drive.files.get({
      fileId,
      fields: "size, mimeType",
    });

    const fileSize = Number(meta.data.size);
    const mimeType = meta.data.mimeType;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": mimeType,
    });

    const response = await drive.files.get(
      {
        fileId,
        alt: "media",
        headers: {
          Range: `bytes=${start}-${end}`,
        },
      },
      { responseType: "stream" }
    );

    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Stream error");
  }
});

module.exports = router;
