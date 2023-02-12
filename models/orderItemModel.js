const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderItemModel {

  constructor(data = {}) {
    this.orderId = data.orderId || null;
    this.productId = data.id;
    this.quantity = data.quantity;
  }

  async create(itemData) {
    try {
      const statement = pgp.helpers.insert(itemData, null, 'order_items') + 'RETURNING *';
 
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async find(orderId) {
    try {
      const statement = `SELECT
                            order_items.id,
                            order_items.quantity, 
                            product.*
                         FROM order_items
                         INNER JOIN product ON product.id = order_items.product_id
                         WHERE order_id = $1`;
      const values = [orderId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        console.log(result.rows)
        return result.rows;
      }
      return [];

    } catch(err) {
      throw new Error(err);
    }
  }

}