const express = require('express')
//const session = require('express-session')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')

const userRouter = require('./routes/user.js')
const orderRouter = require('./routes/order.js')
const productRouter = require('./routes/product.js')
const registrationRouter = require('./routes/registration.js')
const loginRouter = require('./routes/login.js')
const cartRouter = require('./routes/cart.js')
const checkoutRouter = require('./routes/checkout.js')
const profileRouter = require('./routes/profile.js')

const PORT = process.env.PORT || 4000;
const cookieKey = process.env.COOKIE_KEY

const app = express()

app.use(express.urlencoded())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}))

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('short'))
app.use('/uploads', express.static('uploads'))

app.use([userRouter, orderRouter, productRouter, registrationRouter, loginRouter, cartRouter, checkoutRouter])

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



