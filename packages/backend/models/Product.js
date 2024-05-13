const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    name: String,
    description: String,
  },
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
