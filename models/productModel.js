const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class ProductModel {

  /**
   * List products
   * @param  {Object} options [Query options]
   * @return {Array}          [Array of products]
   */
  async find() {
    try {

      const statement = `SELECT *
                         FROM product`;
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw err;
    }
  }

  async findByCategory(category) {
    try {

      const statement = `SELECT * FROM product 
                        WHERE category_id = (SELECT id FROM product_category WHERE name = $1)`;
      const values = [category.category];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw err;
    }
  }

  /**
   * Retrieve product by ID
   * @param  {Object}      id [Product ID]
   * @return {Object|null}    [Product record]
   */
  async findOne(id) {
    try {

      const statement = `SELECT *
                         FROM product
                         WHERE id = $1`;
      const values = [id];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw err;
    }
  }

  async create(data) {
    try {
      const name = data.name
      const desc = data.desc
      const image = data.image
      const price = data.price
      // Generate SQL statement - using helper for dynamic parameter injection
      //const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
      const statement = `INSERT INTO product (name, desc, image, price) VALUES ($1, $2, $3, $4)`
      const values = [name, desc, image, price]
    
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

} 