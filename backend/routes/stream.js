const express = require("express");
const drive = require("../google/drive");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const fileId = req.params.id;
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Range header required");
  }

  try {
    // Get file size
    const meta = await drive.files.get({
      fileId,
      fields: "size,mimeType",
    });

    const fileSize = Number(meta.data.size);
    const mimeType = meta.data.mimeType;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": mimeType,
    });

    const driveStream = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream", headers: { Range: `bytes=${start}-${end}` } }
    );

    driveStream.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Streaming error");
  }
});

module.exports = router;
 