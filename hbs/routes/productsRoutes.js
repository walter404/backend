const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').get(productController.homePage);
router
    .route('/products')
    .get(productController.productsPage)
    .post(productController.addProduct);

module.exports = router;