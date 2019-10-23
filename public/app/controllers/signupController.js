(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('SignupController', [
            '$http',
            '$scope',
            'authService', 
            signupController
        ]);

    function signupController($http, $scope, authService) {
        var vm = this;

        vm.signupSuccess = false;
        vm.signupError = false
        vm.signupErrorMessage = null;

        vm.signup = signup;
        
        vm.addbioMethod = function addbioLocal(username, bio){
                console.log('attempting to update bio');
                authService.addbio(vm.username, vm.bio).then(function(result){
                    console.log(result.message);
                    vm.bio = result.message;
                });
        };

        function signup() {
            vm.signupSuccess = false;
            vm.signupError = false
            vm.signupErrorMessage = null;

            if(!vm.username || !vm.password) {
                vm.signupError = true;
                vm.signupErrorMessage = 'Username and password required!';
                return;
            }

            authService.signup(vm.username, vm.password, vm.email, vm.firstname, vm.lastname, vm.profilepic)
                .then(handleSuccessfulSignup)
                .catch(handleFailedSignup);
        }

        function handleSuccessfulSignup(response) {
            vm.signupSuccess = true;
        }

        function handleFailedSignup(response) {
            vm.signupSuccess = false;

            if(response && response.data) {
                vm.signupErrorMessage = response.data.message;
                vm.signupError = true;
            }
        }
        
    }

})();