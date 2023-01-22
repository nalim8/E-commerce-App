const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const CartModel = require('../models/cartModel')
const CartItemModel = require('../models/cartItemModel');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const Cart = new CartModel()
const CartItem = new CartItemModel()

router.get('/cart', async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Load user cart based on ID
        const response = await Cart.findOneByUser(userId);

        // Load cart items and add them to the cart record
        const items = await CartItem.find(cart.id);
        cart.items = items;
  
        res.status(200).send(response);
  
      } catch(err) {
        next(err);
    }
})

router.put('/cart', async (req, res,next) => {
    try {
        const { id } = req.user;
      
        const response = await Cart.get({ id });
        res.status(200).send(response);
      } catch(err) {
        next(err);
        throw err
      }
})

router.post('/cart', async (req, res, next) => {
    try {
        const userId = req.user.id;
      
        const Cart = new CartModel();
        const response = await Cart.create(userId);
  
        res.status(200).send(response);
      } catch(err) {
        next(err);
        throw err
    }
})

router.post('/cart/items', async (req, res, next) => {
    try {
      const userId = req.user.id;
      const data = req.body;
    
      // Load user cart based on ID
      const cart = await Cart.findOneByUser(userId);

      // Create cart item
      const response = await CartItem.create({ cartId: cart.id, ...data });

      res.status(200).send(response);
    } catch(err) {
      next(err);
      throw err
    }
});

router.put('/cart/items/:id', async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        const data = req.body;

        const response = await CartItem.update(cartItemId, data);

        res.status(200).send(response);
    } catch(err) {
        next(err);
        throw err
    }
});

router.delete('/cart/items/:id', async (req, res, next) => {
    try {
        const cartItemId = req.params.id;

        const response = await CartItem.delete(cartItemId);

        res.status(200).send(response);
    } catch(err) {
        next(err);
        throw err
    }
});

async function checkout(cartId, userId, paymentInfo) {
    try {

      const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

      // Load cart items
      const cartItems = await CartItem.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        return total += Number(item.price);
      }, 0);

      // Generate initial order
      const Order = new OrderModel({ total, userId });
      Order.addItems(cartItems);
      await Order.create();

      // Make charge to payment method (not required in this project)
      const charge = await stripe.charges.create({
        amount: total,
        currency: 'eur',
        source: paymentInfo.id,
        description: 'Super Charge'
      });

      // On successful charge to payment method, update order status to COMPLETE
      const order = Order.update({ status: 'COMPLETE' });

      return order;

    } catch(err) {
      throw err;
    }
  }

router.post('/cart/checkout', async (req, res, next) => {
    try {
        const userId = req.user.id;

        const { cartId, paymentInfo } = req.body; 

        const response = await checkout(cartId, userId, paymentInfo);

        res.status(200).send(response);
    } catch(err) {
        next(err);
        throw err
    }
});


module.exports = router


/* router.post('/cart', (req, res) => { 
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
}) */