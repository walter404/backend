const { options } = require('../sqlite3/connection');
const knex = require('knex')(options);

knex.schema
  .createTable('messages', (table) => {
    table.increments('id');
    table.string('email');
    table.string('message');
    table.timestamp('timestamp');
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
  });
