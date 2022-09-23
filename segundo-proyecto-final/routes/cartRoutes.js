const express = require('express');

switch (process.env.NODE_ENV) {
  case 'mongodb':
    cartController = require('../daos/cart/cartControllerMongoDB');
    break;
  case 'firebase':
    cartController = require('../daos/cart/cartControllerFirebase');
    break;
  default:
    cartController = require('../daos/cart/cartControllerFile');
}

const router = express.Router();

router.route('/').post(cartController.createCart);
router.route('/:id').delete(cartController.deleteCart);
router
  .route('/:id/products')
  .post(cartController.addProductToCart)
  .get(cartController.getProductsFromCart);
router
  .route('/:id/products/:productId')
  .delete(cartController.deleteProductFromCart);

module.exports = router;