/*'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    Recipe = require('../models/recipe'),
    Savedrecipe = require('../models/savedrecipe.js'),
    dbQuery = require('../services/databaseQuery');
    

var addRecipeController = {};

const rec = 

db.query('INSERT INTO Recipe SET ?', rec, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});*/