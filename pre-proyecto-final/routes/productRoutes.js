const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.isAdmin, productController.createProduct);
router
  .route('/:id')
  .get(productController.getProduct)
  .put(productController.isAdmin, productController.updateProduct)
  .delete(productController.isAdmin, productController.deleteProduct);

module.exports = router;
