const express = require('express');

switch (process.env.NODE_ENV) {
  case 'mongodb':
    productController = require('../controllers/productControllerMongoDB');
    break;
  case 'firebase':
    productController = require('../controllers/productControllerFirebase');
    break;
  default:
    productController = require('../controllers/productControllerFile');
}

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