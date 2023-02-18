const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

  async createItem(sessionId, productId) {
    try {
      const statement = `INSERT INTO cart 
                         (session_id, product_id, quantity)
                         VALUES ($1, $2, $3)
                         RETURNING *`;
      const values = [sessionId, productId, 1];                   
 
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async updateItem(sessionId, productId, quantity) {
    try {
      const statement = `UPDATE cart
                         SET quantity = $1
                         WHERE product_id = $2
                         AND session_id = $3`;
      const values = [quantity, productId, sessionId];

      const result = await db.query(statement, values);
      console.log(result)
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
                         WHERE id = $2`;
      const values = [increase, id];
      
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findItems(sessionId) {
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

  async getItemsWithDetails(sessionId) {
    try {
      const statement =`SELECT
                          product.id,
                          product.name,
                          product.desc,
                          product.image,
                          product.category_id,
                          product.inventory_id,
                          product.price,
                          cart.quantity,
                          (product.price * cart.quantity) AS total_price,
                          SUM(product.price * cart.quantity) OVER () AS grand_total
                        FROM
                          cart
                        INNER JOIN product ON cart.product_id = product.id
                        WHERE
                          cart.session_id = $1`;
      const values = [sessionId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }
      return null;

    } catch(err) {
      throw Error(err);
    }
  }

  async getItemId(sessionId, productId) {
    try {
      const statement = `SELECT id
                         FROM cart
                         WHERE session_id = $1 
                         AND product_id = $2`;
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

  async deleteItem(productId, sessionId) {
    try {
      const statement = `DELETE
                         FROM cart
                         WHERE product_id = $1
                         AND session_id = $2`;
      const values = [productId, sessionId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0].id;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async deleteAllItems(sessionId) {
    try {
      const statement = `DELETE
                         FROM cart
                         WHERE session_id = $1
                         RETURNING *`;
      const values = [sessionId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}