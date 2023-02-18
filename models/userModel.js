const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {

  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  };

  async update(userId, data) {
    try {
      const id = userId
      const { ...params } = data;

      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(params, null, 'users') + condition;
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  };

  async findOneByEmail(email) {
    try {
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  };

  async findOneById(id) {
    try {
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [id];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  };

  async findOneByGoogleId(googleId) {
    try {
      const statement = `SELECT *
                         FROM users
                         WHERE google_id = $1`;
      const values = [googleId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  };

  async deleteOneById(id) {
    try {
      const statement = `DELETE FROM users WHERE id = $1`;
      const values = [id];

      await db.query(statement, values);
      
    } catch (err) {
      throw new Error(err);
    }
  };
};