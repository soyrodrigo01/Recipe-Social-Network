(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('NavController', [
            '$http',
            'authService',
            navController
        ]);

    function navController($http, authService) {
        var vm = this;

        vm.isAuthenticated = authService.isAuthenticated;
        vm.logout = authService.logout;
        
        vm.username = '';
        $http({ method: 'GET', url: '/api/addbio'})
            .then(function(response) {
                if(response && response.data) {
                    vm.username = response.data.username;
                }
            });
    }

})();