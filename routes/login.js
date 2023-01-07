const express = require('express')
const router = express.Router()
const db = require('../db')
const passport = require('passport')
const LocalStrategy = require('passport-local')
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


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/~' + req.user.username);
    });

module.exports = router