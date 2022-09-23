const admin = require('firebase-admin');

exports.isAdmin = (req, res, next) => {
  const isAdmin = true;

  if (!isAdmin) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not an admin',
    });
  }
  next();
};

exports.getProducts = async (req, res) => {
  try {
    const products = await admin.firestore().collection('products').get();

    const productsArray = [];

    products.forEach((doc) => {
      productsArray.push(doc.data());
    });

    res.status(200).json({
      status: 'success',
      results: productsArray.length,
      data: {
        products: productsArray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await admin
      .firestore()
      .collection('products')
      .doc(req.params.id)
      .get();

    res.status(200).json({
      status: 'success',
      data: {
        product: product.data(),
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await admin
      .firestore()
      .collection('products')
      .add(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await admin
      .firestore()
      .collection('products')
      .doc(req.params.id)
      .update(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await admin.firestore().collection('products').doc(req.params.id).delete();

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