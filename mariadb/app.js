const express = require('express');
const { engine } = require('express-handlebars');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', productRouter);

module.exports = app;
