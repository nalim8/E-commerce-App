const express = require('express')
const router = express.Router()
const db = require('../db')


const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
  };
  
router.use(requestTime);

router.post('/register', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        created_at: req.requestTime
    }
    
    // Check if user already exists
    db.query('SELECT username FROM user WHERE username = $1', [userData.username], 
    (error, result) => {
        if (result.rows[0] && result.rows[0].length > 0) {
            res.send({message: "User already exists"})
        }
        else {
            db.query('INSERT INTO user VALUES ($1, $2, $3, $4, $5)', 
            [userData.username, userData.password, userData.first_name, userData.last_name, userData.telephone], 
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