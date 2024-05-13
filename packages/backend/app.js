const express = require("express");
require('dotenv').config();
const app = express();


const connectDB = require('./config/database');
connectDB();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
