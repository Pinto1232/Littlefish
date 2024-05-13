const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
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
    console.log("Token generated for user:", username);
    res.send({ token });
  }
);

module.exports = router;
