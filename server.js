const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const indexRouter = require('./routes');

const clientUrl = process.env.CLIENT_URL;
const sessionSecret = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 4500;

module.exports = {
  configure: (app) => {
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
      origin: `${clientUrl}`,
      credentials: true,
      optionSuccessStatus: 200
    }));
    app.use(flash());
    app.use(session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(morgan('dev'));
    app.use('/', indexRouter);
  },
  start: (app) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};