const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send('Error registering user');
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const trimmedPassword = password.trim();
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(trimmedPassword))) {
      return res.status(401).send('Authentication failed');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;