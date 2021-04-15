const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const {
        username, password, category, name, department
      } = req.body;
      const url = 'mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      const dbName = 'ELearning';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url,{useNewUrlParser:true});
          debug('Connected Correctly to Server');

          const db = client.db(dbName);

          const col = db.collection('Users');
          const user = {
            username, password, category, name, department
          };
          const results = await col.insertOne(user);
          debug(results);
          req.logIn(results.ops[0], () => res.redirect('/auth/profile'));
        } catch (err) {
          debug(err.stack);
        }
      }());

      debug(req.body);
      // create user
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/books',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      debug(req.user);
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
