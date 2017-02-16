(function() {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', 'userService', '$state'];

    function authService(lock, authManager, userService, $state) {

        function login() {
            lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
            userService.logout();
            authManager.unauthenticate();
            $state.go('home');
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            lock.on('authenticated', function(authResult) {
                lock.getProfile(authResult.idToken, function(error, profile) {
                    if (error) {
                        return console.log(error); //throw better error here(redirect to page?)
                    } else {
                        localStorage.setItem('id_token', authResult.idToken);
                        userService.mongoAuth(profile.user_id, function(success) {
                            if (success) {
                                localStorage.setItem('authProfile', JSON.stringify(profile));
                                userService.sync();
                                authManager.authenticate();
                                $state.go('dashboard.goals');
                            }
                        });
                    }
                });
            });
        }

        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener
        };
    }
})();
