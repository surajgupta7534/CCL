const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

const mysql = require('mysql');

const config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pslibary',
});

function router(nav) {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      const dbName = 'ELearning';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url,{useNewUrlParser:true});
          debug('Connected to Server');

          const db = client.db(dbName);

          const col = await db.collection('Books');

          const books = await col.find().toArray();

          res.render('bookListView',
            {
              nav,
              title: ' MyLibrary',
              books
            });
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    });


  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;//  same as const id =req.params.id;
      const url = 'mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      const dbName = 'ELearning';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url,{useNewUrlParser:true});
          debug('Connected to Server');

          const db = client.db(dbName);

          const col = await db.collection('Books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: ' ELearning',
              books: book,
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return bookRouter;
}

module.exports = router;


// / bookRouter.route('/')
//   //   .get((req, res) => {
//   //     config.query('select * from books', (error, result) => {
//   //       console.log(result);
//   //       res.render('bookListView',
//   //         {
//   //           nav,
//   //           title: ' MyLibrary',
//   //           books: result,
//   //         });
//   //     });
//   //   });

// my sql
// bookRouter.route('/:id')
//     .get((req, res) => {
//       (async function Query() {
//         const { id } = req.params;//  same as const id =req.params.id;
//         await config.query(`select * from books where id=${id}`, (error, result) => {
//           console.log(`this new ${result}`);
//           res.render(
//             'bookView',
//             {
//               nav,
//               title: ' MyLibrary',
//               books: result[0],
//             }
//           );
//         });
//       }());
//     });
//   return bookRouter;
// }
