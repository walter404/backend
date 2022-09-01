const { options } = require('../mariaDB/connection');
const knex = require('knex')(options);

knex.schema
  .createTable('products', (table) => {
    table.increments('id');
    table.string('title');
    table.integer('price');
    table.string('thumbnail');
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
