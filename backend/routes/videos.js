const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json([
    { id: "123", name: "Test Video.mp4" }
  ]);
});

module.exports = router;