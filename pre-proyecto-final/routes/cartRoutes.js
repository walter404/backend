const express = require('express');
const cartController = require('../controllers/cartController');

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
