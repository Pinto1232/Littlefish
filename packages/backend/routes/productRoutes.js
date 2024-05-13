const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.uploadImage, productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.uploadImage, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.listProducts);

module.exports = router;