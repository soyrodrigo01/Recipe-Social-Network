'use strict';

var config = require('../config');
var db = require('../services/database');
var dbQuery = require('../services/databaseQuery');

// The user controller.
var UserController = {
    index: function(req, res) {
        res.status(200).json({ 
            username: req.user.username, 
            password: req.user.password,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            profilepic: req.user.profilepic,
            bio: req.user.bio,
            interest: req.user.interest,
            favoriterecipe: req.user.favoriterecipe
        });
    }
};


module.exports = UserController;