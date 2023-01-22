const express = require('express')
const router = express.Router()
const db = require('../db')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const crypto = require('crypto')
const UserModel = require('../models/userModel')

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const User = new UserModel()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  new Promise(User.findOneById(id)).then((user) => {
    done(null, user)
  }) 
})


const localStrategy = new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = $1', [username], function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
          if (err) { return cb(err); }
          if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return cb(null, false, { messsage: 'Incorrect username or password.' });
          }
          return cb(null, user);
      });
  });
})

const googleStrategy = new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "/login/google/redirect",
  passReqToCallback: true
},
  function(accessToken, refreshToken, profile, done) {
    console.log('passport callback function fired')
    console.log('profile: ', profile)
    
    const { id, displayName } = profile
    
    const currentUser = User.findOneByGoogleId()
    
    if (currentUser) {
      console.log(`User is ${currentUser}`)
      done(null, currentUser)
    } else {
      new Promise(
        User.create({
          username: displayName,
          googleId: id
        }).then((newUser) => {
          console.log('new user created' + newUser)
          done(null, newUser)
        })
      )
      done(null, newUser)
    }
  }
)

passport.use(localStrategy);
passport.use(googleStrategy);

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})


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

module.exports = router