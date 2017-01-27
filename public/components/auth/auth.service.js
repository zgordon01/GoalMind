(function () {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', '$q', '$state'];

    function authService(lock, authManager, $q, $state) {

        function login() {
            lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            authManager.unauthenticate();
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            var deferredProfile = $q.defer();
            lock.on('authenticated', function (authResult) {
                localStorage.setItem('id_token', authResult.idToken);
                lock.getProfile(authResult.idToken, function (error, profile) {
                    if (error) {
                        return console.log(error);
                    }
                    localStorage.setItem('profile', JSON.stringify(profile));
                    deferredProfile.resolve(profile);
                    $state.transitionTo('userHome');
                });
                authManager.authenticate();

            });
        }

        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener
        };
    }
})();
