const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/products', (req, res) => {
    db.query('SELECT * FROM product', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

// funktioniert noch nicht
router.get('/products', (req, res) => {
    const category = req.query.category 
    db.query('SELECT * FROM product WHERE category_id = (SELECT id FROM product_category WHERE name = $1)', [category], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

router.get('/products/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM product WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

module.exports = router