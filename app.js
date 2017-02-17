var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionStore = require('express-mysql-session')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
var admins = require('./routes/admins');
var list = require('./routes/list');
var detail = require('./routes/detail');
var comment = require('./routes/comment');
var category = require('./routes/category');
var usersList = require('./routes/usersList');
var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var options = {
  host:'localhost',
  user:'root',
  password:'xiajing',
  database:'movie'
};
var SessionStore = new sessionStore(options);
//SessionStore.close();
app.use(session({
  secret:'movie',
  cookie:{maxAge:1000*60*30},
  store:SessionStore,
  resave: true,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/admins',admins);
app.use('/list',list);
app.use('/detail',detail);
app.use('/comment',comment);
app.use('/category',category);
app.use('/usersList',usersList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //res.render('404',{message:err.message,error:err});
  next(err);
});

// error handlers

// development error handler,will print stacktrace
if (app.get('env') === 'development') {

  //app.set('showStackError',true);
  //app.use(express.logger(':method :url :status'));
  //app.locals.pretty = true;


  app.use(function(err, req, res, next) {
    console.log('err.status:' + err.status);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
