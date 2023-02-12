const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const OrderItem = require('./orderItemModel');

module.exports = class OrderModel {

  constructor(data = {}) {
    this.items = data.items || [];
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }

  addItems(items) {
    this.items = items.map(item => new OrderItem(item));
  }

  getItems() {
    return this.items
  }

  async create(total, userId) {
    try {
      /* const { items, ...order } = this;
      const statement = pgp.helpers.insert(order, null, 'orders') + ' RETURNING *'; */
      const statement = `INSERT INTO order_details
                         (total, user_id)
                         VALUES ($1, $2)
                         RETURNING *`
      const values = [total, userId]                 

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        // Add new information generated in the database (ie: id) to the Order instance properties
        //Object.assign(this, result.rows[0]);

        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async update(data) {
    try {
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
      const statement = pgp.helpers.update(data, null, 'order_details') + condition;
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findByUser(userId) {
    try {
      const statement = `SELECT *
                         FROM order_details
                         WHERE user_id = $1`;
      const values = [userId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findById(orderId) {
    try {
      const statement = `SELECT *
                         FROM order_details
                         WHERE id = $1`;
      const values = [orderId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      const statement = `SELECT *
                         FROM order_details`;
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const statement = `DELETE 
                         FROM order_details
                         WHERE id = $1`;
      const values = [id]                   

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;                   
    } catch(err) {
      throw new Error(err);
    }
  }

  async createOrderDetails(sessionId, userId) {
    const result = await db.query(`
      WITH cart_items AS (
        SELECT 
          cart.session_id, 
          cart.product_id, 
          cart.quantity
        FROM 
          cart
        WHERE 
          cart.session_id = $1
      ), order_total AS (
        SELECT 
          SUM(product.price * cart_items.quantity) AS total, 
          cart_items.session_id
        FROM 
          cart_items
          INNER JOIN product ON product.id = cart_items.product_id
        GROUP BY 
          cart_items.session_id
      )
      INSERT INTO 
        order_details (total, user_id)
        SELECT 
          order_total.total, 
          $2
        FROM 
          order_total
        RETURNING id
    `, [sessionId, userId]);
    return result.rows[0].id;
  }
  
  async createOrderItems(orderId, sessionId) {
    await db.query(`
      INSERT INTO 
        order_items (order_id, product_id, quantity)
        SELECT 
          $1, 
          cart.product_id, 
          cart.quantity
        FROM 
          cart
        WHERE 
          cart.session_id = $2
    `, [orderId, sessionId]);
  }

  async createOrder(sessionId, userId) {
    const orderId = await this.createOrderDetails(sessionId, userId);
    await this.createOrderItems(orderId, sessionId);
  }

}