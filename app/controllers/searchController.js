'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    Recipe = require('../models/recipe'),
    Savedrecipe = require('../models/savedrecipe.js'),
    dbQuery = require('../services/databaseQuery');

// The authentication controller.
var SearchController = {};

SearchController.addSavedRecipe = function(req, res) {
    if(!req.body.username || !req.body.recipeID) {
        console.log('An error occured');        
        res.status(404).json({ message: 'Please type a recipe ID' });
    } else {
        var username = req.body.username,
            recipeID = req.body.recipeID,
            saveOrUnsave = req.body.saveOrUnsave;
        
        console.log('Inserting recipe with id: ' + recipeID + ' for user: ' + username + ' value: ' + saveOrUnsave);
        
        if (saveOrUnsave && saveOrUnsave == true) {
            Savedrecipe.create({
                username: username,
                recipeID: recipeID
            })
            .then(function(result){
                console.log(result);
                res.status(200).json({ message: 'Created', result: result})

                
            });
        } else {
            Savedrecipe.destroy({ where: { username: username, recipeID: recipeID }}).then(function (result) {
                res.status(202).json({ message: 'Deleted', result: result });
            });
            
        }
        
    }
};



// Register a recipe.
// SearchController.addRecipe = function(req, res) {
//     if(!req.body.name || !req.body.description) {
//         res.json({ message: 'Please provide a name and a description.' });
//     } else {
//         db.sync().then(function() {
//             var newRecipe = {
//                 name: req.recipe.name, 
//                 description: req.recipe.description,
//                 instructions: req.recipe.instructions,
//                 cuisine: req.recipe.cuisine,
//                 published: req.recipe.published,
//                 time: req.recipe.time,
//                 source: req.recipe.source,
//                 image: req.recipe.image
//             };

//             return Recipe.create(newRecipe).then(function() {
//                 res.status(201).json({ message: 'Recipe created!' });
//             });
//         }).catch(function(error) {
//             console.log(error);
//             res.status(403).json({ message: 'There was an error when creating the recipe' });
//         });
//     }
// }

// Get a recipe for search
SearchController.getRecipe = function(req, res) {
    if(!req.body.query) {
        res.status(404).json({ message: 'Please type something in the search bar' });
    } else {
        var query = req.body.query,
            username = req.body.username;
        console.log('Received search request for: ' + query);

        
        dbQuery.query("select distinct r.name, r.description, r.source, r.user, r.id, r.instructions, r.cuisine, r.image, " +
                     "sr.recipeID as saved " +
                     "from RecipeIngredient ri " +
                        "join Recipe r on r.id = ri.recipe_id " +
                        "left join savedrecipes sr on sr.recipeID = r.id and sr.username = ? " + 
                     " where lower(ri.ingredientAndMeasurement) like lower(concat('%', ?, '%'));", [username, query], (err, result) => {
            if(err) {
                console.log(err); 
                res.json({"error": err});
            }
            else { 
                console.log(result); 
                res.json({message: result}); 
            }
        });
        
        // Recipe.findOne(potentialRecipe).then(function(recipe) {
        //     if(!recipe) {
        //         res.status(404).json({ message: 'No recipes found' });
        //     } else {
        //         var token = jwt.sign(
        //             { name: recipe.name }
        //         );
                
        //         res.json({
        //             success: true,
        //             token: 'JWT' + token,
        //         });
        //     }
        // }).catch(function(error) {
        //     res.status(500).json({ message: 'There was an error!' });
        // });
    }
}

SearchController.GetSavedRecipes = function(req, res) {
    var username = req.body.username;
    //var query = req.body.query;
    console.log('Graving saved recipes for: ' + username);
    
    dbQuery.query("select name, description, source, user, instructions, cuisine, image " +
                  "from savedrecipes sr " +
                  "join Recipe r on r.id = sr.recipeID " +
                  "where sr.username = " + "'" +username+"';", (err, result) => {
        if(err) {
            console.log(err);
            res.json({"error": err});
        } else {
            console.log(result);
            res.json({message: result});
        }
    });
}

module.exports = SearchController;
