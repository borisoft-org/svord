const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

const app = express();

/*
const index = require('./routes/index');//Commented out, we'll use other method for '/'
app.use('/', index);
*/

//Import ROUTERS (file names are relative to the current folder)
// Routes pertaining to "/orders" described in "/routes/orders.js";
const orders = require('./routes/orders');
// Routes pertaining to "/users" described in "/routes/users.js";
const users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//Setup Handlebars as the template engine of the application:
// Set name of default layout file (views/layouts/main) and the default extension of handlebar views (.hbs)
app.engine(".hbs", exphbs({defaultLayout: "main", extname: ".hbs"}));
// Set Handlebars as view engine
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Associate URLs begins with "/users" with the "users.js" router:
// requests to '/[users[/any...]]' will be handled by users.js as '/any...')
app.use('/users', users);
//Associate URLs begins with "/orders" with the "orders.js" router:
// requests to '/[orders[/any...]]' will be handled by orders.js as '/any...')
app.use('/orders', orders);

// AlexB | 2018.03.01
// HOME('/') & ABOUT('/about') URLs do not have dedicated Routers;
// Map them manually right here:

// HOME URL handler renders 'view/index.hbs' page (view)
app.get('/', (req, res) => {
	res.render('index', {
		definition: req.protocol +'://' + req.hostname + ':' + app.get('port') + req.baseUrl + req.path,
		mapping: req.method + '( \'' + req.path + '\', (req,res) => {//handler} )'
	});
});

// ABOUT URL handler renders 'view/about.hbs' page (view)
app.get('/about', (req, res) => {
	res.render('about', {
		definition: req.protocol +'://' + req.hostname + ':' + app.get('port') + req.baseUrl + req.path,
		mapping: req.method + '( \'' + req.path + '\', (req,res) => {//handler} )'
	});
});

// APPSTART URL handler renders 'view/appstart.hbs' page (view)
app.get('/appstart', (req, res) => {
	res.render('appstart', {
		definition: req.protocol +'://' + req.hostname + ':' + app.get('port') + req.baseUrl + req.path,
		mapping: req.method + '( \'' + req.path + '\', (req,res) => {//handler} )'
	});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
