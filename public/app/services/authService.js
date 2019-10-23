(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .factory('authService', [
            '$http',
            '$cookies',
            '$state',
            authService
        ]);

    function authService($http, $cookies, $state) {

        var authService = {
            login: login,
            logout: logout,
            signup: signup,
            getUserData: getUserData,
            isAuthenticated: isAuthenticated,
            editinfo: editinfo,
            GetSavedRecipes: GetSavedRecipes
        };

        return authService;

        function login(username, password) {
            var reqObj = {
                method: 'POST',
                url: '/api/authenticate',
                data: {
                    username: username,
                    password: password
                }
            };

            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    response = response.data;

                    var expires = new Date(),
                        user = {};

                    console.log(response);
                    user.username = response.username;
                    user.role = response.role;
                    user.token = response.token;

                    expires.setTime(expires.getTime() + (30 * 60 * 1000));

                    $cookies.put(
                        'user',
                        JSON.stringify(user),
                        { expires: expires }
                    );
                }
            });
        }
        
        function GetSavedRecipes(username){
            var reqObj = {
                method: 'POST',
                url: '/api/GetSavedRecipes',
                data:{
                    username: username
                }
            };
            
            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    return response.data;
                }
            });
        }

        function logout() {
            $cookies.remove('user');
            $state.go('index');
        }

        function isAuthenticated() {
            var user = $cookies.get('user');
            return user && user !== 'undefined';
        }

        function getUserData() {
            if(isAuthenticated()) {
                return JSON.parse($cookies.get('user'));
            }

            return false;
        }

        function signup(username, password, email, firstname, lastname, profilepic) {
            var reqObj = {
                method: 'POST',
                url: '/api/signup',
                data: {
                    username: username,
                    password: password,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    profilepic: profilepic
                }
            };

            return $http(reqObj);
        }
        
        function editinfo(username, email, firstname, lastname, profilepic, bio, interest, favoriterecipe){
            var reqObj = {
                method: 'POST',
                url: '/api/editinfo',
                data:{
                    username: username,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    profilepic: profilepic,
                    bio: bio,
                    interest: interest,
                    favoriterecipe: favoriterecipe
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