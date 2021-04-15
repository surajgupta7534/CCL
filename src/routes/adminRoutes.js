const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const books = [

  {
    author: 'Chinua Achebe',
    title: 'Things Fall Apart',
  },
  {
    author: 'Hans Christian Andersen',
    title: 'Fairy tales',
  },
  {
    author: 'Dante Alighieri',
    title: 'The Divine Comedy',
  },
  {
    author: 'Steve Jobs',
    title: 'The Epic Of Gilgamesh',
  },
  {
    author: 'Andrew Flinttop',
    title: 'The Book Of Job',
  },
  {
    author: 'Chetan Bhagat',
    title: 'One Thousand and One Nights',
  },
  {
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    author: 'Samuel Beckett',
    title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      const dbName = 'ELearning';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url,{useNewUrlParser:true});
          console.log('Connected to Server');

          const db = client.db(dbName);

          const response = await db.collection('Books').insertMany(books);
          console.log(response);
          res.json(response);
        } catch (err) {
          console.log(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
