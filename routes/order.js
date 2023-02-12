const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel')
const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')

const Order = new OrderModel()
const OrderItem = new OrderItemModel()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

async function getOrderData(userId) {
  const Order = new OrderModel()
  const OrderItem = new OrderItemModel()
  
  let orders = await Order.findByUser(userId);
  console.log('orders:', orders)
  /* if (typeof orders === 'object') {
    orders = [orders]
  } */ 
  const promises = orders.map(async order => {
    const items = await OrderItem.find(order.id)
    return { 
      id: order.id,
      createdAt: order.created_at,
      total: order.total,
      items: items
    }
  })
  
  const orderData = await Promise.all(promises)

  return orderData
}

router.get('/orders', async (req, res, next) => {
  try {
    const userId = 1;

    const orderData = await getOrderData(userId)

    res.status(200).send(orderData);
    } catch(err) {
      next(err);
    }
})

router.post('/orders', async (req, res, next) => {
  try {
      //const userId = req.user.id;
      //const sessionId = req.sessionID
      const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"
      const userId = 1;

      Order.createOrder(sessionId, userId)
        .then(() => {
          console.log('Order created successfully');
          res.status(201).send('OK')
        })
        .catch(error => {
          console.error('Error creating order: ', error);
        });
        
    } catch(err) {
     next(err)
    }
})

router.delete('/orders/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const result = await Order.delete(orderId)

    res.status(204).send(`Order with ID ${orderId} deleted`)
  } catch(err) {
    next(err)
  }
})

module.exports = router

/* router.get('/orders/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const result = await Order.findById(orderId);
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
}) */

/* async function getCartItems(req) {
  const Cart = new CartModel()
  const Product = new ProductModel()
  const sessionId = "_P5DZ1nM0vbDP2Zdq6DCg5ahko01kENO";
  
  const items = await Cart.findItems(sessionId);

  const promises = items.map(async item => {
    const product = await Product.findOne(item.product_id)
    return { ...product, quantity: item.quantity }
  })
  const cartItems = await Promise.all(promises)

  return cartItems
}

async function calculateTotal(items) {
  const total = items.reduce((sum, item) => {
    return sum + item.quantity * parseInt(item.price.replace(" €", "").replace(",", "").replace(".", "")) 
  }, 0)
  //console.log('total', total)
  return total
} */



/* router.get('/orders/items', async (req, res) => {
  try {
    const orderId = 1
    const result = await OrderItem.find(orderId)
    res.send(result)
  } catch(err) {
    next(err)
  } 
}) */

