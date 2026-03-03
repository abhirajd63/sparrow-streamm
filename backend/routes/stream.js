const express = require("express");
const drive = require("../google/drive");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const fileMeta = await drive.files.get({
      fileId,
      fields: "size, name, mimeType",
    });

    const fileSize = parseInt(fileMeta.data.size, 10);
    const range = req.headers.range;

    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;

    const chunkSize = end - start + 1;

    const response = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      {
        responseType: "stream",
        headers: {
          Range: `bytes=${start}-${end}`,
        },
      }
    );

    res.status(206);
    res.set({
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": fileMeta.data.mimeType,
    });

    response.data.pipe(res);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;