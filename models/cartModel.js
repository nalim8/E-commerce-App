const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

  async create(sessionId) {
    try {
      const data = { session_id: sessionId }

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

  async findOneBySession(sessionId) {
    try {
      const statement = `SELECT *
                         FROM cart
                         WHERE session_id = $1`;
      const values = [sessionId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneById(cartId) {
    try {
      const statement = `SELECT *
                         FROM cart
                         WHERE id = $1`;
      const values = [cartId];
  
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