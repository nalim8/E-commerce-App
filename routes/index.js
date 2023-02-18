const router = require('express').Router();
const userRouter = require('./user');
const orderRouter = require('./order');
const productRouter = require('./product');
const registrationRouter = require('./registration');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const checkoutRouter = require('./checkout');

router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/register', registrationRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/checkout', checkoutRouter);

module.exports = router;



