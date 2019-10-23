'use strict';

// NPM dependencies.
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    path = require('path');

// App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

// Initializations.
var app = express();

// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up the HTTP logger.
app.use(morgan('dev'));

// Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// Set the static files location.
app.use(express.static(__dirname + '/../public'));

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

// Catch all route.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
});

// Start the server.
app.listen('8080', function() {
    console.log('Magic happens at https://8f0bcc2410344b33aa6e941a432b3e56.vfs.cloud9.us-east-2.amazonaws.com/ ');
});
