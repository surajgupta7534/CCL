const passport = require('passport');
require('./strategies/local.strategy')();
const session = require('express-session');

module.exports = function passportConfig(app) {
  app.use(session({ secret: 'anything' }));
  app.use(passport.initialize());
  app.use(passport.session());


  // stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // Retrives user from seesion
  passport.deserializeUser((user, done) => {
    // find user by id
    done(null, user);
  });
};
