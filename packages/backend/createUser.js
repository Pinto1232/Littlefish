  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  require('dotenv').config(); 

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  const User = mongoose.model('User', userSchema);

  async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  }

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

  async function run() {
    await connectDB();
    await createUser('pinto@gmail.com', 'rj200100p');
    mongoose.disconnect();
  }

  run();