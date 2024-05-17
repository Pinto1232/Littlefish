const Product = require("../models/Product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created directory: ${uploadDir}`);
} else {
  console.log(`Directory already exists: ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`Saving file to: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename =
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.uploadImage = upload.single("image");

exports.createProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("File:", req.file);

    if (typeof req.body.price === "string") {
      req.body.price = parseFloat(req.body.price.replace(/[^0-9.-]+/g, ""));
    }

    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      ...req.body,
      imageUrl: req.file ? url + "/uploads/" + req.file.filename : undefined,
    });

    await product.save();
    console.log("Product Created:", product);

    res.status(201).send(product);
  } catch (error) {
    console.error("Error Creating Product:", error);
    res.status(400).send(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

console.log("Product Controller Loaded");

exports.updateProduct = async (req, res) => {
  console.log("Updating Product:", req.params.id);
  try {
    if (typeof req.body.price === "string") {
      req.body.price = parseFloat(req.body.price.replace(/[^0-9.-]+/g, ""));
    }

    const url = req.protocol + "://" + req.get("host");
    const updatedData = {
      ...req.body,
      imageUrl: req.file ? url + "/uploads/" + req.file.filename : undefined,
    };
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send({ message: "Product deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};
