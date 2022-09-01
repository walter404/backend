const { options } = require('./sqlite3/connection');
const knex = require('knex')(options);

class Messages {
  constructor() {
    this.knex = knex;
  }
  async getMessages() {
    const result = await this.knex.select().from('messages');
    return result;
  }
  async addMessage(message) {
    const result = await this.knex('messages').insert(message);
    return result;
  }
}

module.exports = new Messages();
