(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .factory('searchService', [
            '$http',
            searchService
        ]);

    function searchService($http) {

        var searchService = {
            search: search,
            addSavedRecipe: addSavedRecipe,
            searchS: searchS
        };

        return searchService;
        
        function addSavedRecipe(username, recipeID, saveOrUnsave){
            var reqObj = {
                method: 'POST',
                url: '/api/addSavedRecipe',
                data:{
                    username: username,
                    recipeID: recipeID,
                    saveOrUnsave: saveOrUnsave
                }
            };
            
            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    return response.data;
                }
            });
        }

        function search(query, username) {
            var reqObj = {
                method: 'POST',
                url: '/api/search',
                data: {
                    query: query,
                    username: username
                }
            };

            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    return response.data;
                }
            });
        }
        
        function searchS(username) {
            var reqObj = {
                method: 'POST',
                url: '/api/searchS',
                data: {
                    username: username
                }
            };

            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    return response.data;
                }
            });
        }
    }
})();