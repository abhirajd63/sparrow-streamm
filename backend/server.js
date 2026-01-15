const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/videos");

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("🐦 Sparrow Stream Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
