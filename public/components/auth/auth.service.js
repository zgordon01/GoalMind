(function() {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', 'userService'];

    function authService(lock, authManager, userService) {

        function login() {
            lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
            sessionStorage.removeItem('id_token');
            sessionStorage.removeItem('userProfile');
            sessionStorage.removeItem('profile');
            authManager.unauthenticate();
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            lock.on('authenticated', function(authResult) {
                lock.getProfile(authResult.idToken, function(error, profile) {
                    if (error) {
                        return console.log(error);//throw better error here(redirect to page?)
                    } else {
                        userService.mongoAuth(profile.user_id, authResult.idToken, function(response) {
                            sessionStorage.setItem('profile', JSON.stringify(response));
                            sessionStorage.setItem('id_token', authResult.idToken);
                            sessionStorage.setItem('userProfile', JSON.stringify(profile));
                            authManager.authenticate();
                            console.log("LOGGED IN");
                        });
                    }
                });
            });
        }

        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener
        }
    }
})();
