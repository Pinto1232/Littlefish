const express = require("express");
require('dotenv').config();
const app = express();



const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Security enhancements
app.use(cors()); 
app.use(helmet()); 

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

// Logging HTTP requests
app.use(morgan('combined'));

const connectDB = require('./config/database');
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));