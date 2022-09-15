const fs = require('fs');

const cart = JSON.parse(fs.readFileSync('./data/cart.json'));

exports.createCart = (req, res) => {
  const newId = cart[cart.length - 1].id + 1;
  const timestamp = new Date().toISOString();
  const newCart = Object.assign(
    { id: newId, timestamp, products: [] },
    req.body
  );

  cart.push(newCart);

  fs.writeFile('./data/cart.json', JSON.stringify(cart, null, 2), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        cart: newCart,
      },
    });
  });
};

exports.deleteCart = (req, res) => {
  const id = req.params.id * 1;

  const newCart = cart.filter((el) => el.id !== id);

  fs.writeFile('./data/cart.json', JSON.stringify(newCart, null, 2), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

exports.getProductsFromCart = (req, res) => {
  const id = req.params.id * 1;

  const cartProducts = cart.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      cart: cartProducts,
    },
  });
};

exports.addProductToCart = (req, res) => {
  const id = req.params.id * 1;

  const cartProducts = cart.find((el) => el.id === id);

  const newCart = cartProducts.products.push(req.body);

  fs.writeFile('./data/cart.json', JSON.stringify(cart, null, 2), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        cart: cartProducts,
      },
    });
  });
};

exports.deleteProductFromCart = (req, res) => {
  const id = req.params.id * 1;
  const productId = req.params.productId * 1;

  const cartProducts = cart.find((el) => el.id === id);

  const newCart = cartProducts.products.filter((el) => el.id !== productId);

  cartProducts.products = newCart;

  fs.writeFile('./data/cart.json', JSON.stringify(cart, null, 2), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};