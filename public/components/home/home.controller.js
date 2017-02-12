'use strict';
angular.module('app').controller('HomeController', HomeController);
HomeController.$inject = ['$state', 'authService', 'jwtHelper', 'authManager', 'userService', 'lock', '$rootScope'];

function HomeController($state, authService, jwtHelper, authManager, userService, lock, rootScope) {
    init();
    var hm = this;
    hm.authService = authService;

    function init() {
        console.log("home init ran");
        if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
            console.log("access token expires in " + jwtHelper.getTokenExpirationDate(localStorage.getItem('id_token')));
            console.log("in logged in");
            authManager.authenticate();
            lock.getProfile(localStorage.getItem('id_token'), function(error, profile) {
                if (error) {
                    //flash message here
                } else {
                    userService.updateUser({}, function(success) {
                        if (success) {
                            $state.go('dashboard.goals');
                            localStorage.setItem('authProfile', JSON.stringify(profile));
                            rootScope.authProfile = profile;
                        }
                    });
                }
            });
        } else {
            console.log("in else");
            userService.logout();
            authManager.unauthenticate();
            //$state.go somewhere???
        }
    }
}
