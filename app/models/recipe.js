/*'use strict'; 

var Sequelize = require('sequelize');

var config = require('../config'),
    db = require('../services/database');

// 1: The model schema.
var modelDefinition = {
    name: {
        type: Sequelize.STRING
    },

    description: {
        type: Sequelize.STRING
    },
    
    instructions: {
        type: Sequelize.STRING
    },
    
    cuisine: {
        type: Sequelize.STRING
    },
    
    published: {
        type: Sequelize.DATE
    },
    
    time: {
        type: Sequelize.INTEGER
    },

    source: {
        type: Sequelize.STRING
    },
    
    image: {
        type: Sequelize.STRING
    }
};

// 2: Define the Recipe model.
var RecipeModel = db.define('recipe', modelDefinition);

module.exports = RecipeModel; */