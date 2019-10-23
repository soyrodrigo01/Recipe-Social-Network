'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../services/routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    SearchController = require('../controllers/searchController'),
    RecipeController = require('../controllers/recipeController');

var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);
    router.post('/editinfo', AuthController.editinfo);
    router.post('/search', SearchController.getRecipe);
    router.post('/addSavedRecipe', SearchController.addSavedRecipe);
    router.post('/searchS', SearchController.GetSavedRecipes);

    // GET Routes.
    //router.get('/search', );
    router.get('/search_auth', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/editinfo', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    return router;
};

module.exports = APIRoutes;