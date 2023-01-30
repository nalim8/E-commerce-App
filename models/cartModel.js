const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

  async createItem(data) {
    try {
      const statement = pgp.helpers.insert(data, null, 'cart') + 'RETURNING *';
 
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async updateItem(productId, data) {
    try {
      const quantity = data.quantity
      
      const statement = `UPDATE cart
                         SET quantity = $1
                         WHERE product_id = $2`
      const values = [quantity, productId]

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async updateQuantity(id, increase) {
    try {
      const statement = `UPDATE cart
                         SET quantity = 
                          CASE
                            WHEN $1 THEN quantity + 1
                            ELSE quantity - 1
                          END
                         WHERE id = $2;`
      const values = [increase, id]
      
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findItem(sessionId) {
    try {
      const statement = `SELECT *
                         FROM cart
                         WHERE session_id = $1`
      const values = [sessionId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw new Error(err);
    }
  }

  async getItemId(sessionId, productId) {
    try {
      const statement = `SELECT id
                         FROM cart
                         WHERE session_id = $1 
                         AND product_id = $2`
      const values = [sessionId, productId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0].id;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async deleteItem(id) {
    try {
      const statement = `DELETE
                         FROM cart
                         WHERE id = $1
                         RETURNING *`;
      const values = [id];
  
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