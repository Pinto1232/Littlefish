const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/adminRoutes');
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));