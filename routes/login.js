const express = require('express')
const router = express.Router()
const db = require('../db')
const passport = require('passport')
const initializePassport = require('../auth/passport-config')
const UserModel = require('../models/userModel')

const User = new UserModel()

initializePassport(
  passport, 
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
)

  username => User.findOneByUsername(username)

/* router.get('/login', (req, res) => {
  res.render('login')
}) */

router.post('/login',
    passport.authenticate('local', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
     }),
    (req, res) => {
      res.redirect('/~' + req.user.username);
    });

router.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})


// -----------------------------
// Routes for Google Login

router.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] })
)

// callback route for google to redirect to
router.get('/login/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) =>{
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

router.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/~' + req.user.username);
    });

function checkAuthenticated(req, res, next) {
  if (req.isAthenticated()) {
    return next()
  }
  res.redirect('/login')
}    

function checkNotAuthenticated(req, res, next) {
  if (req.isAthenticated()) {
    return res.redirect('/')
  }
  next()   
}

module.exports = router