angular.module('app').controller('DashboardController', ['$state', 'authService', 'jwtHelper', '$state', 'authManager', 'userService', function($state, authService, jwtHelper, $state, authManager, userService) {
    var dash = this;
    init();
    function init() {
        console.log("dash init ran");
        if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
            userService.sync();
            console.log("auth good");
        } else {
            userService.logout();
            authManager.unauthenticate();
            $state.transitionTo('home');
        }
    }

}]);
