const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Hardcoded admin (BEGINNER MODE)
const admin = {
  email: "admin@sparrow.com",
  password: bcrypt.hashSync("admin123", 10),
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== admin.email) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = bcrypt.compareSync(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;
