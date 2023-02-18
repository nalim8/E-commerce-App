const router = require('express').Router()
const passport = require('passport');
const initializePassport = require('../auth/passport-config');
const UserModel = require('../models/userModel');

const clientUrl = process.env.CLIENT_URL;

const User = new UserModel();

initializePassport(
  passport, 
  email => User.findOneByEmail(email),
  id => User.findOneById(id),
  googleId => User.findOneByGoogleId(googleId)
);

router.post('/login', passport.authenticate('local', {
  successRedirect: `${clientUrl}/auth`,
  failureRedirect: `${clientUrl}/auth`,
  failureFlash: true
}));

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });;
  }
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: `${clientUrl}/auth` }),
  (req, res) =>{
    res.redirect(`${clientUrl}`);
  }
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${clientUrl}`);
};

router.get('/logout', checkAuthenticated, (req, res) => {
  req.logout(err = {
    if (err) {
      console.log(err)
    }
  });
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.status(200).send('Logged out successfully');
});

module.exports = router;