const mongoose = require("mongoose");

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using URI from env variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    // Log error and exit on failure
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

// Export connectDB function
module.exports = connectDB;