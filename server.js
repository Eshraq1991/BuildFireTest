var express = require('express');

var app = express();

var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/mongoDB';

mongoose.connect(mongoURI);

db = mongoose.connection;

require('./config/middleware.js')(app, express);

require('./config/routes.js')(app, express);

console.log("running on http://localhost:3000");

module.exports = app;