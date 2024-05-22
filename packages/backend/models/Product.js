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
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  brand: { type: String },
  ratings: [{ type: Number }],
  isAvailable: { type: Boolean, default: true },
  discount: { type: Number, default: 0 },
  tags: [{ type: String }],
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  manufacturer: { type: String },
  warranty: { type: String },
  reviews: [
    {
      user: { type: String },
      comment: { type: String },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
