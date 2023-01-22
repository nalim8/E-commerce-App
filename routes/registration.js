const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({ capSQL: true });
const createError = require('http-errors');
const UserModel = require('../models/userModel');
const User = new UserModel();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


/* const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
  };
  
router.use(requestTime); */


const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOneByUsername(username);
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

router.post('/register', handleNewUser)

/* router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log('Request '+ req)
    console.log('username: '+ username)
    console.log('password: '+ password)
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
}) */

module.exports = router