const express = require('express')
const router = express.Router()

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/login')
  } else {
    // if logged in
    next()
  }
}

router.get('/profile', authCheck, (req, res) => {
  res.send('you are logged in, this is your profile - ' + req.user.username)
})

module.exports = router