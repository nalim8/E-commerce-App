const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });
const OrderItem = require('./orderItemModel');

module.exports = class OrderModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || 'PENDING';
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }

  addItems(items) {
    this.items = items.map(item => new OrderItem(item));
  }

  /**
   * Creates a new order for a user
   * @return {Object|null}        [Created order record]
   */
  async create() {
    try {

      const { items, ...order } = this;

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(order, null, 'order_details') + ' RETURNING *';

      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {

        // Add new information generated in the database (ie: id) to the Order instance properties
        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an order for a user
   * @param  {Object}      id   [Order ID]
   * @param  {Object}      data [Order data to update]
   * @return {Object|null}      [Updated order record]
   */
  async update(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
      const statement = pgp.helpers.update(data, null, 'order_details') + condition;
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Loads orders for a user
   * @param  {number} userId [User ID]
   * @return {Array}         [Order records]
   */
  static async findByUser(userId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM order_details
                         WHERE user_id = $1`;
      const values = [userId];
  
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

  /**
   * Retrieve order by ID
   * @param  {number}      orderId [Order ID]
   * @return {Object|null}         [Order record]
   */
  static async findById(orderId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM order_details
                         WHERE id = $1`;
      const values = [orderId];
  
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

  static async findAll() {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM order_details`;
      const values = [userId];
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}