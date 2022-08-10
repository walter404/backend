const fs = require('fs');

const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
);

exports.homePage = (req, res) =>{
    res.render('home')
};

exports.productsPage = (req,res) =>{
    res.render('products', {
        products,
    });
};

exports.addProduct = (req, res) => {
    const {title, price, image} = req.body;
    const newProduct = {
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