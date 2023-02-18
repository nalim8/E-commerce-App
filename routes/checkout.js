const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const CartModel = require('../models/cartModel');
const OrderModel = require('../models/orderModel');

const clientUrl = process.env.CLIENT_URL;

const Cart = new CartModel();

router.get('/cart/checkout', async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const cartItems = await Cart.getItemsWithDetails(sessionId);
    
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
      success_url: `${clientUrl}/cart/checkout/success`,
      cancel_url: `${clientUrl}/cart/checkout//cancel`
    });
    res.json({ url: session.url });
    next();
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}, postOrder);

async function postOrder(req, res) {
  try {
    const sessionId = req.sessionID;
    const userId = req.user.id;

    const Order = new OrderModel();

    Order.createOrder(sessionId, userId)
        .then(() => {
          console.log('Order created successfully');
          res.status(201).send('OK');
        })
        .catch(error => {
          console.error('Error creating order: ', error);
        });

    await Cart.deleteAllItems(sessionId);
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;