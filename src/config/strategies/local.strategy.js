const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      const dbName = 'ELearning';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url,{useNewUrlParser:true});
          debug('Connected');
          const db = client.db(dbName);
          const col = db.collection('Users');

          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
      }());
    }
  ));
};
