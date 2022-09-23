const Cart = require('../../models/cartModelMongoDB');

exports.createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);

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
    await Cart.findByIdAndDelete(req.params.id);

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
    const cart = await Cart.findById(req.params.id);

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
    const cart = await Cart.findById(req.params.id);

    cart.products.push(req.body);

    await cart.save();

    res.status(201).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    const newCart = cart.products.filter((el) => el.id !== req.body.id);

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