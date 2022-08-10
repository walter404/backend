// Configuración inicial
const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const productRouter = require('./routes/productsRoutes')
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded( {extended:true}));

app.engine(
    'hbs', 
    engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views')

app.use('/', productRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
