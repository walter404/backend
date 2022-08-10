const fs = require('fs');

const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
);

exports.homePage = (req, res) => {
    res.render('pages/index');
  };

exports.productsPage = (req, res) =>{
    res.render('pages/products',{
        products,
    });
};

exports.addProduct = (req, res) =>{
    const { title, price, image} = req.body;
    const newProduct ={
        title,
        price,
        image
    };
    products.push(newProduct);
    fs.writeFileSync(
        `${__dirname}/../data/products.json`,
        JSON.stringify(products)
    );
    res.redirect('/');
};