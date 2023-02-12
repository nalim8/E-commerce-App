const express = require('express')
const router = express.Router()
const db = require('../db')
const bodyParser = require('body-parser')
const CartModel = require('../models/cartModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const Cart = new CartModel()

/* router.get('/cart', async (req, res, next) => {
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
}) */

router.get('/cart/items', async (req, res, next) => {
    try {
        //const sessionId = req.sessionID;
        const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"

        const items = await Cart.getItemsWithDetails(sessionId);

        res.status(200).send(items);
      } catch(err) {
        next(err);
    }
})   

router.post('/cart/items', async (req, res, next) => {
    try {
        //const sessionId = req.sessionID;
        const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"
        const productId = req.body.id
        
        const itemId = await Cart.getItemId(sessionId, productId)
        if (!itemId) {
            const createdItem = await Cart.createItem(sessionId, productId);
            res.status(200).send({data: createdItem, message: "Item created"});
        }
        
    } catch(err) {
        next(err);
        throw err
    }
});

router.put('/cart/items', async (req, res, next) => {
    try {
        const productId = req.body.id
        const quantity = req.body.quantity
        //const sessionId = req.sessionID
        const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS"

        const updatedItem = await Cart.updateItem(sessionId, productId, quantity);
        console.log('updatedItem:', updatedItem)

        res.status(200).send({ data: updatedItem, message: "Item successfully updated" });
    } catch(err) {
        next(err);
        throw err
    }
});

router.delete('/cart/items/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;
        const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS";

        const deletedItemId = await Cart.deleteItem(productId, sessionId);

        res.status(200).send(`Cart item with ID ${deletedItemId} was deleted`);
    } catch(err) {
        next(err);
        throw err
    }
});

router.delete('/cart/items', async (req, res, next) => {
    try {
        const sessionId = "vz2g7a5Qbqrk-YIN473CttUxk3BDWdSS";

        const result = await Cart.deleteAllItems(sessionId);

        res.status(200).send(result);
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