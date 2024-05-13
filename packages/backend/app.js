const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

const connectDB = require('./config/database');
connectDB();

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



// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);



// Start server
const PORT = process.env.PORT || '';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));