const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const CartModel = require('../models/cartModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const Cart = new CartModel()

router.get('/cart', async (req, res, next) => {
    try {
        const sessionId = req.sessionID;

        const cart = await Cart.findOneBySession(sessionId);

        res.status(200).send(cart);
      } catch(err) {
        next(err);
    }
})

router.post('/cart', async (req, res, next) => {
    try {
        const sessionId = req.sessionID;

        const cart = await Cart.createItem(sessionId);
  
        res.status(200).send(cart);
      } catch(err) {
        next(err);
        throw err
    }
})

router.post('/cart/items', async (req, res, next) => {
    try {
      //const sessionId = req.sessionID;
      const sessionId = "_P5DZ1nM0vbDP2Zdq6DCg5ahko01kENO"
      const productId = req.body.product_id
      const data = req.body;
      
      const itemId = await Cart.getItemId(sessionId, productId)
      console.log('itemId: ', itemId)
      if (itemId) {
        res.send("Item is already in the cart")
        req.itemId = itemId
        next()
      } else {
        const createdItem = await Cart.createItem({ session_id: sessionId, ...data });
        res.status(200).send(createdItem);
      }
      
    } catch(err) {
      next(err);
      throw err
    }
});

router.put('/cart/items', async (req, res, next) => {
    try {
        const productId = req.body.productId
        const data = req.body

        const updatedItem = await Cart.updateItem(productId, data);

        //res.status(200).send("Item successfully updated")
        res.status(200).send({ data: updatedItem, message: "Item successfully updated" });
    } catch(err) {
        next(err);
        throw err
    }
});

router.delete('/cart/items/:id', async (req, res, next) => {
    try {
        const cartItemId = req.params.id;

        const deletedItem = await Cart.deleteItem(cartItemId);

        res.status(200).send(deletedItem);
    } catch(err) {
        next(err);
        throw err
    }
});

module.exports = router


/* router.get('/cart/items', async (req, res, next) => {
    try {
        const sessionId = req.sessionID;

        const items = await Cart.findItem(sessionId);

        res.status(200).send(items);
      } catch(err) {
        next(err);
    }
}) */

/* router.put('/cart/:id', async (req, res,next) => {
    try {
        const cartId  = req.params.id;

        const cart = await Cart.findOneById(cartId);

        res.status(200).send(cart);
      } catch(err) {
        next(err);
        throw err
      }
}) */

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