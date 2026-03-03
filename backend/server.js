const express = require("express");
const cors = require("cors");

const videoRoutes = require("./routes/videos");
const streamRoutes = require("./routes/stream");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamRoutes);

// Root route (optional but useful)
app.get("/", (req, res) => {
  res.send("Sparrow Stream Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Sparrow Stream Backend is running 🚀");
});