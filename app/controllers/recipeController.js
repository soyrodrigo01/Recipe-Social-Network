'use strict';

// The recipe controller.
var RecipeController = {
    index: function(req, res) {
        res.status(200).json({ 
            id: req.recipe.id,
            name: req.recipe.name, 
            description: req.recipe.description,
            instructions: req.recipe.instructions,
            cuisine: req.recipe.cuisine,
            published: req.recipe.published,
            time: req.recipe.time,
            source: req.recipe.source,
            image: req.recipe.image,
            user: req.recipe.user
            
        });
    }
};

module.exports = RecipeController;