if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const userRouter = require('./routes/user.js')
const orderRouter = require('./routes/order.js')
const productRouter = require('./routes/product.js')
const registrationRouter = require('./routes/registration.js')
const loginRouter = require('./routes/login.js')
const cartRouter = require('./routes/cart.js')
const checkoutRouter = require('./routes/checkout.js')
const profileRouter = require('./routes/profile.js')

const PORT = process.env.PORT || 4000;

const app = express()

app.use(express.urlencoded())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}))

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(morgan('short'))
app.use('/uploads', express.static('uploads'))

app.use([userRouter, orderRouter, productRouter, registrationRouter, loginRouter, cartRouter, checkoutRouter])

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



