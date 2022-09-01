const { options } = require('../sqlite3/connection');
const knex = require('knex')(options);

// Delete all row
knex('messages')
  .from('messages')
  .del()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
