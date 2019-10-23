(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('EditinfoController', [
            '$http',
            '$scope',
            '$state',
            'authService',
            editinfoController
        ]);

    function editinfoController($http, $scope, $state, authService) {
        var vm = this;

        vm.username = '';
        vm.password = '';
        vm.email = '';
        vm.firstname = '';
        vm.lastname = '';
        vm.profilepic = '';
        vm.bio = '';
        vm.interest = '';
        vm.favoriterecipe = '';
        
        vm.editinfoSuccess = false;
        vm.editinfoError = false;
        vm.editinfoErrorMessage = null;

        $http({ method: 'GET', url: '/api/editinfo' })
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
                    
                }
            });
        
        function handleSuccessfuleditinfo(response) {
            $state.go('index');
        }
        
        function handleFailededitinfo(response) {
            vm.editinfoSuccess = false;
            
            if(response && response.data) {
                vm.editinfoErrorMessage = response.data.message;
                vm.editinfoError = true;
            }
        }
        
        vm.editinfoMethod = function editinfoLocal(username, email, firstname, lastname, profilepic, bio, interest, favoriterecipe){
                console.log('attempting to update info');
                authService.editinfo(vm.username, vm.email, vm.firstname, vm.lastname, vm.profilepic, vm.bio, vm.interest, vm.favoriterecipe)
                    .then(handleSuccessfuleditinfo);/*.then(function(result){
                    console.log(result.message);
                    $state.go('profile');
                    vm.bio = result.message;
                });*/
        };
    }

})();