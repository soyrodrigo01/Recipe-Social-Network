(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('SearchController', [
            'searchService',
            '$http',
            '$scope',
            'authService',
            searchController
        ]);

    function searchController(searchService, $http, $scope, authService) {
        var sc = this;
       
       sc.checked = {};
       
       sc.loggedIn = authService.isAuthenticated();
       if (sc.loggedIn) {
           sc.userData = authService.getUserData();
       }
        
        sc.searchMethod = function (query) {
            console.log('attempting search');
            searchService.search(query, sc.userData === undefined ? '' : sc.userData.username).then(function(result) {
                console.log(result.message);
                sc.recipes = result.message;
                sc.recipes.forEach(function (recipe) {
                   recipe.checked = recipe.id == recipe.saved; 
                });
            });
        };

       sc.saveRecipe = function (recipeID, saveOrUnsave) {
           console.log('attempting to insert a saved recipe ' + saveOrUnsave);
           searchService.addSavedRecipe(sc.userData.username, recipeID, saveOrUnsave)
            .then(function(result){
               console.log(result.message);
               console.log(result.result);
           });
       };
       
    }
})();