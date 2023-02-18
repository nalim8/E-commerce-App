const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

function initialize(passport, getUserByEmail, getUserById, findOneByGoogleId) {
  
  const authenticateLocalUser = async (email, password, done) => {
    console.log('Passport callback function fired')
    
    const user = await getUserByEmail(email);

    if (user == null) {
      console.log('No user with that email address')
      return done(null, false, { message: 'No user with that email address' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('user in authenticateUser:', user)
        return done(null, user);
      } else {
        console.log('Password is incorrect')
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch(err) {
      return done(err);
    }
  };

  const authenticateGoogleUser = async (req, accessToken, refreshToken, profile, done) => {
    console.log('Passport callback function fired')
  
    const { id, name, emails } = profile;
    
    const currentUser = await findOneByGoogleId(id);
    
    if (currentUser) {
      console.log('User is:', currentUser)
      done(null, currentUser);
    } else {
      const User = new UserModel
      User.create({
        email: emails[0].value,
        first_name: name.givenName,
        last_name: name.familyName,
        google_id: id
      }).then(newUser => {
        console.log('New user created' + newUser)
        done(null, newUser)
      }).catch((err) => {
        done(err, null);
      });
    }
  };

  const localStrategy = new LocalStrategy({ usernameField: 'email' }, authenticateLocalUser);

  const googleStrategy = new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:4000/auth/google/redirect",
    passReqToCallback: true
  }, authenticateGoogleUser);
  
  passport.use(localStrategy);
  passport.use(googleStrategy);
  
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    return done(null, user);
  }); 
};

module.exports = initialize;