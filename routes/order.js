const router = require('express').Router();
const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel');

const Order = new OrderModel();

async function getOrderData(userId) {
  const Order = new OrderModel();
  const OrderItem = new OrderItemModel();
  
  let orders = await Order.findByUser(userId);
  
  const promises = orders.map(async order => {
    const items = await OrderItem.find(order.id);
    return { 
      id: order.id,
      createdAt: order.created_at,
      total: order.total,
      items: items
    };
  });
  const orderData = await Promise.all(promises);

  return orderData;
}

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orderData = await getOrderData(userId);

    res.status(200).send(orderData);
    } catch(err) {
      next(err);
    }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const sessionId = req.sessionID;

    Order.createOrder(sessionId, userId)
      .then(() => {
        console.log('Order created successfully');
        res.status(201).send('OK');
      })
      .catch(error => {
        console.error('Error creating order: ', error);
      });
        
    } catch(err) {
     next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id;
    await Order.delete(orderId);

    res.status(204).send(`Order with ID ${orderId} deleted`);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
