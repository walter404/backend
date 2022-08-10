const express = require('express');
const pug = require('pug')
const productRouter = require('./routes/productRoutes')
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', './views');


app.use('/', productRouter )



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });