require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//DB models imports
const User = require('./models/user');

//Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');

const app = express();

//connect to DB
mongoose
  .connect(
    process.env.MONGO_URI, 
    {useNewUrlParser: true}
    );
// user: steklofan pass: NJxncCm9iekZxYZU
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("we're connected!")
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // for using PUT method in forms

//configure passport local and sessions
//set sessions BEFORE Passport startegy !
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set local variables MW
app.use(function(req, res, next) {
  //TEMPORARILY
  // req.user = {
  //   '_id': '5d27bb2dd283672b294c6ff4',
  //   'username':"Alex"
  // }
  req.user = {
    '_id': '5d27c31e76af7d2fc35e29b1',
    'username':"Alex23"
  }
  res.locals.currentUser = req.user;
  //END TEMPORARILY
  //set default page title
  res.locals.title = "Pin-Shop"
  //set success flash messages
  res.locals.success = req.session.success || '';
  delete req.session.success;
  //set error flash messages
  res.locals.error = req.session.error || '';
  delete req.session.error;
  //got to next func in MW chain
  next();
})
//ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err)
  req.session.error = err.message;
  res.redirect("back");
});

module.exports = app;
