const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
//const bodyParser = require('body-parser')

const userRouter = require('./routes/user.js')
const orderRouter = require('./routes/order.js')
const productRouter = require('./routes/product.js')
const registrationRouter = require('./routes/registration.js')
const loginRouter = require('./routes/login.js')
const cartRouter = require('./routes/cart.js')
const checkoutRouter = require('./routes/checkout.js')

app.use([userRouter, orderRouter, productRouter, registrationRouter, loginRouter, cartRouter, checkoutRouter])

app.use(morgan('short'))
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



