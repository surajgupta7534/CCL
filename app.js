const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Suraj123:Suraj@123@cclcluster.v9ymt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/ELearning',{
  useNewUrlParser:true,
  useUnifiedTopology:true
}). then(()=>{
  console.log("Mongodb Connected...")
});

const app = express();
require('./src/config/passport.js')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
);
const config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pslibary',
});

config.connect((err) => {
  if (err) {
    debug(`${chalk.red('Connection is not established')}`);
  } else {
    debug(`${chalk.green('Connection is established Successfully')}`);
  }
});


app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'BOOK' },
  { link: '/authors', title: 'AUTHOR' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'BOOKS' },
      { link: '/authors', title: 'AUTHORS' }],
    title: ' ELearning',
  });
});

app.listen(3000, () => {
  debug(`listening at port ${chalk.greenBright('3000')}`);
});
