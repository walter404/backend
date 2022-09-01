const { options } = require('./mariaDB/connection');
const knex = require('knex')(options);

class Container {
  constructor() {
    this.knex = knex;
  }
  async getProducts() {
    const result = await this.knex.select().from('products');
    return result;
  }
  async getProduct(id) {
    const result = await this.knex.select().from('products').where('id', id);
    return result;
  }
  async addProduct(product) {
    const result = await this.knex('products').insert(product);
    return result;
  }
  async updateProduct(id, product) {
    const result = await this.knex('products').where('id', id).update(product);
    return result;
  }
  async deleteProduct(id) {
    const result = await this.knex('products').where('id', id).del();
    return result;
  }
}

module.exports = new Container();
