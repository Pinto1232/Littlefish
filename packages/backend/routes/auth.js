const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

// multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// User registration
router.post("/register", upload.single("image"), async (req, res) => {
  const { username, password } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const user = new User({ username, password, image });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const trimmedPassword = password.trim();
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(trimmedPassword))) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error during login" });
  }
});

module.exports = router;
