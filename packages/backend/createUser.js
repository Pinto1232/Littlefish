const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected...");
}

// Create a new user with hashed password
async function createUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Run the script to connect to DB and create a user
async function run() {
  await connectDB();
  await createUser('pinto@gmail.com', 'rj200100p');
  mongoose.disconnect();
}

run();