const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const productRouter = require('./routes/productRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));


app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', productRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
