const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// login route
router.post(
  "/login",
  [
    body("username").isString().trim().escape(),
    body("password").isString().trim(),
  ],
  async (req, res) => {
    console.log("Request Body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log("Finding user:", username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).send("Authentication failed");
    }

    console.log("Comparing password for user:", username);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password mismatch for user:", username);
      return res.status(401).send("Authentication failed");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT Secret:", process.env.JWT_SECRET);
    res.send({ token });
  }
);

// Registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already exists");
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
});

module.exports = router;
