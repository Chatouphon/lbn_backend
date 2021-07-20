var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const dotenv = require('dotenv');

dotenv.config();

// const port = process.env.PORT;
const port = process.env.PORT || 80;

app.listen(port, function () {
  console.log(`Server start successfully on port ${port}`);
})

const mongoose = require('mongoose')
const DB = async() => {
  await mongoose.connect(process.env.DB_CONNECT ,
    {
      keepAlive: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }, () => 
    console.log('Connected to database!')
  );
}
DB()

var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var postsRouter = require('./routes/posts');
app.use('/post', postsRouter);
var adminRouter = require('./routes/admin');
app.use('/adacc', adminRouter);
var guideRouter = require('./routes/guide');
app.use('/guide', guideRouter);
var addressRouter = require('./routes/address');
app.use('/address', addressRouter);
var activityRouter = require('./routes/activityPlan');
app.use('/activity', activityRouter);
var bloodGroupRouter = require('./routes/bloodGroup');
app.use('/bloodGroup', bloodGroupRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

const donorRoute = require('./routes/donation');
app.use('/donation', donorRoute);

const requestRoute = require('./routes/request');
app.use('/request', requestRoute)

const EmergencyDonorRoute = require('./routes/Emergency')
app.use('/donate', EmergencyDonorRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
