const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
const streamRoutes = require("./routes/stream");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
