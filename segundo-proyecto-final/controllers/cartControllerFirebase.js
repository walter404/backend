const admin = require('firebase-admin');

exports.createCart = async (req, res) => {
  try {
    const newCart = await admin.firestore().collection('cart').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      products: [],
    });

    res.status(201).json({
      status: 'success',
      data: {
        cart: newCart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await admin.firestore().collection('cart').doc(req.params.id).delete();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProductsFromCart = async (req, res) => {
  try {
    const cart = await admin
      .firestore()
      .collection('cart')
      .doc(req.params.id)
      .get();

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const cart = await admin
      .firestore()
      .collection('cart')
      .doc(req.params.id)
      .get();

    cart.products.push(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const cart = await admin
      .firestore()
      .collection('cart')
      .doc(req.params.id)
      .get();

    cart.products = cart.products.filter(
      (product) => product.id !== req.params.productId
    );

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};