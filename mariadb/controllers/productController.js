const Container = require('../Container');
const Messages = require('../Messages');

exports.homePage = async (req, res) => {
  const products = await Container.getProducts();
  const messages = await Messages.getMessages();
  res.render('home', {
    products,
    messages,
  });
};

exports.productsPage = async (req, res) => {
  const products = await Container.getProducts();
  res.render('products', {
    products,
  });
};
