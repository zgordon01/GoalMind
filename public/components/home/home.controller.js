(function() {

    'use strict';

    angular.module('app').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$http', 'authService', 'jwtHelper', 'authManager'];

    function HomeController($scope, $state, $http, authService, jwtHelper, authManager) {
        init();

        var vm = this;
        vm.authService = authService;


        function init() {
            console.log("home init ran");
            if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
                authManager.authenticate();
                $state.go('dashboard');
            } else {
                authManager.unauthenticate();
            }
        }

    }

}());
