const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const UserModel = require('../models/userModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const User = new UserModel()
 
router.get('/users', async (req, res) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    })
})

router.get('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const result = await User.findOneById(userId);
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const userData = req.body

    const result = await User.create(userData)
    res.status(201).send(result);
  } catch(err) {
    next(err);
  }
})

router.put('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const userData = req.body

    const result = await User.update(userId, userData)
    res.status(200).send(result)
  } catch(err) {
    next(err)
  }
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

/* router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id

    const result = await User.deleteOneById(userId)
  } catch(err) {
    next(err)
  }
}) */

module.exports = router


/* router.post('/users', async (req, res) => {
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
}) */