const { options } = require('../mariaDB/connection');
const knex = require('knex')(options);

const products = [
  { title: 'Manzana Roja', price: 100, thumbnail: 'red-apple.png' },
  { title: 'Tangerine', price: 200, thumbnail: 'tangerine.png' },
  { title: 'Banana', price: 300, thumbnail: 'banana.png' },
  { title: 'Watermelon', price: 400, thumbnail: 'watermelon.png' },
  { title: 'Grapes', price: 500, thumbnail: 'grapes.png' },
];

knex('products')
  .insert(products)
  .then(() => console.log('products inserted'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
