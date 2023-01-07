const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
 
router.get('/users', (req, res) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    })
})

router.get('/users/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    })
})

router.post('/users', (req, res) => {
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password
    db.query('INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *', [id, username, password], (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${result.rows[0].id}`)
    })
})

router.put('/users/:id', (req, res) => {
    const id = req.params.id
    const username = req.body.username
    const password = req.body.password
    db.query('UPDATE users SET username = $1, password = $2 WHERE id = $3', [username, password, id], (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    })
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      res.status(204).send(`User deleted with ID: ${id}`)
    })
})

module.exports = router