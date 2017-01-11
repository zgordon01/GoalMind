(function () {

    'use strict';

    angular
        .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
        .config(config);

    config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

    function config($stateProvider, lockProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'HomeController',
                templateUrl: 'components/home/home.html',
                controllerAs: 'vm'
            });

        lockProvider.init({
            clientID: 'GkzbEfm3t2d2DNUgAYkUZnR7X9pLcpn5',
            domain: 'zgordon01.auth0.com'
        });

        $urlRouterProvider.otherwise('/home');
    }

})();
