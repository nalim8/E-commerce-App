const express = require('express')
const router = express.Router()
const db = require('../db')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const crypto = require('crypto')


passport.use(new LocalStrategy(function verify(username, password, cb) {
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
}));

passport.use(new GoogleStrategy({
    clientID: "247075986295-0lhpg1nr19crseqnq2j1us8l9qb24qrk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/~' + req.user.username);
    });



module.exports = router