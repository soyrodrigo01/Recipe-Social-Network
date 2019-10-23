'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user'),
    dbQuery = ('../services/databaseQuery');

// The authentication controller.
var AuthController = {};

AuthController.editinfo = function(req, res){
    if(/*!req.body.bio ||*/ !req.body.username) {
        res.status(404).json({ message: 'Please fill both fields' });
    } else {
        var username = req.body.username;
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var profilepic = req.body.profilepic;
        var bio = req.body.bio;
        var interest = req.body.interest;
        var favoriterecipe = req.body.favoriterecipe;
        
        console.log('Updating info for: ' + username);
        
        User.update({
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            profilepic: profilepic,
            bio: bio,
            interest: interest,
            favoriterecipe: favoriterecipe
        }, {
            where: { username: username },
            returning: true,
            plain: true
        })
        .then(function(result){
            console.log(result);
        });
        
        /*dbQuery.query("UPDATE users SET bio = ("+bio+") WHERE username = ("+username+");", (err, result) => {
            if(err) {
                console.log(err);
                res.json({"error": err});
            } else {
                console.log(result);
                res.json({message: result});
            }
        });*/
    }
};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.json({ message: 'Please provide a username and a password.' });
    } else {
        db.sync().then(function() {
            var newUser = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                profilepic: req.body.profilepic
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'Username already exists!' });
        });
    }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(404).json({ message: 'Username and password are needed!' });
    } else {
        var username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };

        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                user.comparePasswords(password, function(error, isMatch) {
                    if(isMatch && !error) {
                        var token = jwt.sign(
                            { username: user.username },
                            config.keys.secret,
                            { expiresIn: '30m' }
                        );

                        res.json({
                            username: username,
                            success: true,
                            token: 'JWT ' + token,
                            role: user.role
                        });
                        
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }
}

module.exports = AuthController;