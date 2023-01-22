const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const OrderModel = require('../models/orderModel');
//const OrderItemModel = require('../models/orderItemModel')

const Order = new OrderModel()
//const OrderItem = new OrderItemModel()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('orders/', async (req, res, next) => {
    try {
        const { id } = req.user;
        console.log(id)
        //const result = await Order.findByUser(id);
        const result = await Order.findAll();
        res.status(200).send(result);
        } catch(err) {
        next(err);
    }
})

router.get('orders/:id', async (req, res, next) => {
    try {
      const orderId = req.params.id;
  
      const result = await Order.findById(orderId);
      res.status(200).send(result);
    } catch(err) {
      next(err);
    }
})


module.exports = router


/* router.get('/orders', (req, res) => {
    const queryString = 'SELECT * FROM order_details ORDER BY created_at DESC'
    db.query(queryString, (error, result) => {
        if (error) {
          throw error
        }
        res.status(200).json(result.rows)
    })
})

router.get('/orders/:id', (req, res) => {
    const id = req.params.id
    const queryString = 'SELECT * FROM order_details WHERE id = $1'
    db.query(queryString, [id], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

router.post('/orders', (req, res) => {
    console.log('body: ', req.body)
    const id = req.body.id
    console.log('id: ', id)
    const total = req.body.total
    const queryString = 'INSERT INTO order_details VALUES ($1, $2)'
    const values = [id, total]
    console.log('values: ', values)
    db.query(queryString, values, (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Order added with ID: ${result.rows[0].id}`)
    })
})

router.put('/orders/:id', (req, res) => {
    const id = req.params.id
    console.log(req.body)
    const total = req.body.total

    db.query(`UPDATE order_details SET total = $1`, [total], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Order modified with ID: ${id}`)
    })
}) */