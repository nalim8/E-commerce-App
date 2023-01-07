const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const path = require('path')
const stripe = require('stripe')('SECRET_KEY'); // Add your Secret Key Here

const YOUR_DOMAIN = "http://localhost:3000";

// This will make our form data much more useful
router.use(bodyParser.urlencoded({ extended: true }));

// static files
router.use(express.static(path.join(__dirname, './views')));

// middleware
router.use(express.json());


router.post('/cart/:id/checkout', (req, res, next) => {
    const id = req.params.id;
    db.query('SELECT id FROM cart WHERE id = $1', [id], (error, result) => {
        if (result.rows[0] && result.rows[0].length > 0) {
            // Process payment and validate payment details

            // Create order
            db.query('INSERT INTO order_details VALUES ($1, $2)', [], (error, result) => {

            })
        }
    })
})

module.exports = router

/*
router.post('/cart/:id/checkout', async (req, res) => {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id });
});
*/

/*
router.post('/cart/:id/checkout', (req, res) => {
    try {
        stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
          })
          .then(customer =>
            stripe.charges.create({
              amount: req.body.amount * 100,
              currency: "usd",
              customer: customer.id
            })
          )
          .then(() => res.render("completed.html"))
          .catch(err => console.log(err));
      } catch (err) {
        res.send(err);
      }
})
*/