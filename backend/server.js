require("dotenv").config();
const express = require("express");
const cors = require("cors");

const videoRoutes = require("./routes/videos");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", videoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Sparrow Stream Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
