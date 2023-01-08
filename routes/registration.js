const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
  };
  
router.use(requestTime);

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    // Check if user already exists
    db.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {  //  'SELECT EXISTS (SELECT 1 FROM users WHERE username = $1) AS exists'
        
        if (result.rows[0] && result.rows[0].length > 0) {    // if (result.rows[0] && result.rows[0].length > 0)
            res.send("Username already exists")
        }
        else {
            db.query('INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password],
            (error, result) => {
                if (error) {
                    throw error
                };
                res.status(201).send(`User added with ID: ${result.rows[0].id}`);
            })
        }
    })  
})

module.exports = router