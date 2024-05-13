const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      try {
        this.password = await bcrypt.hash(this.password, 8);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
  
  UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error('Comparison failed', error);
    }
  };

const User = mongoose.model("User", UserSchema);
module.exports = User;
