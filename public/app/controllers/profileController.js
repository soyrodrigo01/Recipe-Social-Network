(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('ProfileController', [
            '$http',
            'authService',
            'searchService',
            profileController
        ]);

    function profileController($http, authService, searchService) {
        var vm = this;

        vm.username = '';
        vm.password = '';
        vm.email = '';
        vm.firstname = '';
        vm.lastname = '';
        vm.profilepic = '';
        vm.bio = '';
        vm.interest= '';
        vm.favoriterecipe = '';


        $http({ method: 'GET', url: '/api/profile' })
            .then(function(response) {
                if(response && response.data) {
                    vm.username = response.data.username;
                    vm.password = response.data.password;
                    vm.email = response.data.email;
                    vm.firstname = response.data.firstname;
                    vm.lastname = response.data.lastname;
                    vm.profilepic = response.data.profilepic;
                    vm.bio = response.data.bio;
                    vm.interest = response.data.interest;
                    vm.favoriterecipe = response.data.favoriterecipe;
                    searchService.searchS(vm.username)
                        .then(function(result){
                            vm.recipes = result.message;
                        });
                }
            });
            
         

/*        vm.SavedRecipes = function(username) {
            console.log('attemting to grab saved recipes for ' + username);
            authService.GetSavedRecipes(username)
                .then(function(result){
                    console.log(result.message);
                    vm.recipes = result.message;
                    console.log(result.result);
                });
        };*/
    }

})();