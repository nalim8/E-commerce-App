const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

passport.use(googleStrategy);