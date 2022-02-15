'use strict'
var express = require('express');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

require('./config/database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Routes definition
require('./routes')(app);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
})