'use strict';

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');
    
var config = require('../config'),
    db = require('../services/database');
    
var modelDefinition = {
    username: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    
    recipeID: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    }
};

var SavedRecipeModel = db.define('savedrecipe', modelDefinition);

module.exports = SavedRecipeModel;