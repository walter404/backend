const express = require('express');

const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);

module.exports = app;
