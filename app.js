// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var expressJWT = require('express-jwt');

// Connect to the MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/signUp');

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(expressJWT({secret:'MyOwnSecretKey'}).unless({path:['/api/signup','/api/login',/^\/api\/verification\/.*/]}));

routes = require('./routes/routes');

app.use('/api', routes);// route middleware to verify a token

// Use environment defined port or 3000
var port = process.env.PORT || 8888;

// Start the server
app.listen(port);
console.log('Server starts on port ' + port);
