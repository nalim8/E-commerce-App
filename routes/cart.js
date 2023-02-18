const router = require('express').Router();
const CartModel = require('../models/cartModel');

const Cart = new CartModel();

router.get('/items', async (req, res, next) => {
  try {
    const sessionId = req.sessionID;

    const items = await Cart.getItemsWithDetails(sessionId);

    res.status(200).send(items);
    } catch(err) {
      next(err);
    }
});   

router.post('/items', async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const productId = req.body.id;
        
    const itemId = await Cart.getItemId(sessionId, productId);
    if (!itemId) {
      const createdItem = await Cart.createItem(sessionId, productId);
      res.status(200).send({data: createdItem, message: "Item created"});
    }    
    } catch(err) {
      next(err);
      throw err;
    }
});

router.put('/items', async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const productId = req.body.id;
    const quantity = req.body.quantity;
    console.log('sessionId', sessionId)
    console.log('productId', productId)
    console.log('quantity', quantity)
        
    const updatedItem = await Cart.updateItem(sessionId, productId, quantity);

    res.status(200).send({ data: updatedItem, message: "Item successfully updated" });
    } catch(err) {
      next(err);
      throw err;
    }
});

router.delete('/items/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const sessionId = req.sessionID;

    const deletedItemId = await Cart.deleteItem(productId, sessionId);

    res.status(200).send(`Cart item with ID ${deletedItemId} was deleted`);
    } catch(err) {
      next(err);
      throw err;
    }
});

router.delete('/items', async (req, res, next) => {
  try {
    const sessionId = req.sessionID;

    const result = await Cart.deleteAllItems(sessionId);

    res.status(200).send(result);
    } catch(err) {
      next(err);
      throw err;
    }
});

module.exports = router;