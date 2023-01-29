const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, 'cart_item') + 'RETURNING *';
 
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async update(id, data) {
    try {
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(data, null, 'cart_item') + condition;
  
      const result = await db.query(statement);

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
      const statement = `UPDATE cart_item
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

  async find(sessionId) {
    try {
      const statement = `SELECT *
                         FROM cart_item
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
                         FROM cart_item
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

  async delete(id) {
    try {
      const statement = `DELETE
                         FROM cart_item
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