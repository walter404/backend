const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./data/products.json'));

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

exports.getProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = (req, res) => {
  const id = req.params.id * 1;
  const product = products.find((el) => el.id === id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};

exports.createProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;
  const timestamp = new Date().toISOString();
  const newProduct = Object.assign({ id: newId, timestamp }, req.body);

  products.push(newProduct);

  fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id * 1;
  const product = products.find((el) => el.id === id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedProduct = Object.assign(product, req.body);

  fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id * 1;
  const product = products.find((el) => el.id === id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const index = products.indexOf(product);
  products.splice(index, 1);

  fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};