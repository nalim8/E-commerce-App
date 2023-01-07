const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

/*
pool.query('SELECT * FROM user', (err, res) => {
    if(!err) {
      console.log(res.rows)
    } else { 
      console.log(err.message)
    }
    pool.end()
})
*/
