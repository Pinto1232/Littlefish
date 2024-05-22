const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const router = express.Router();

const client = new OAuth2Client("383304292643-ola2k1jfh9f0a39gd5ijv5h9ph125sfr.apps.googleusercontent.com");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Register a new user with image upload
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

// Login a user and return a JWT token
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

// Google OAuth login
router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "383304292643-ola2k1jfh9f0a39gd5ijv5h9ph125sfr.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, email, name, picture });
      await user.save();
    } else {
      user.email = email;
      user.name = name;
      user.picture = picture;
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;