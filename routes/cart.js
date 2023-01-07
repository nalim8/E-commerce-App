const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/cart', (req, res) => { 
    const cartId = req.body.id
    const itemId = req.body.item_id
    db.query('INSERT INTO cart VALUES ($1, $2)', [cartId, itemId], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send('Cart added')
    })
})

router.put('/cart/:id', (req, res) => { 
    const cartId = req.params.id
    const itemId = req.body.item_id
    db.query('UPDATE cart SET item_id = $1 WHERE id = $2', [itemId, cartId], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Cart added with ID: ${result.rows[0].id}`)
    })
})

router.get('/cart/:id', (req, res) => {
    const cartId = req.params.id
    db.query('SELECT * FROM cart_item WHERE id = $1', [cartId], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

module.exports = router