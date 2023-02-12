const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')
const OrderModel = require('../models/orderModel')

const Cart = new CartModel()

//const YOUR_DOMAIN = "http://localhost:3000";

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.get('/cart/checkout', async (req, res, next) => {
  try {
    //const sessionId = req.sessionID
    const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"
    const cartItems = await Cart.getItemsWithDetails(sessionId)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map(item => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name
            },
            unit_amount: parseInt(item.price.replace(/[^\d]/g, '').replace(',', ''))
          },
          quantity: item.quantity
        }
      }), 
      success_url: `${process.env.CLIENT_URL}/cart/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart/checkout//cancel`
    })
    res.json({ url: session.url })
    next()
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}, postOrder)

async function postOrder(req, res) {
  try {
    const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"
    const userId = 1

    const Order = new OrderModel()

    Order.createOrder(sessionId, userId)
        .then(() => {
          console.log('Order created successfully');
          res.status(201).send('OK')
        })
        .catch(error => {
          console.error('Error creating order: ', error);
        });

    // Clear the cart after the order is created
    await Cart.deleteAllItems(sessionId)
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = router



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
} */