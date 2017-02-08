(function() {

    'use strict';

    angular
        .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
        .config(config);

    config.$inject = ['$stateProvider', 'lockProvider', 'jwtOptionsProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider'];

    function config($stateProvider, lockProvider, jwtOptionsProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: './components/home/home.html',
                controllerAs: 'vm'
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                templateUrl: './components/dashboard/dashboard.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('dashboard.goals', {
                url: '/goals',
                templateUrl: './components/dashboard/goals.html'

            });
        $urlRouterProvider.otherwise('/');
        lockProvider.init({
            clientID: 'GkzbEfm3t2d2DNUgAYkUZnR7X9pLcpn5',
            domain: 'zgordon01.auth0.com'
        });
        // Configuration for angular-jwt
        jwtOptionsProvider.config({
            tokenGetter: function() {
                return localStorage.getItem('id_token');
            },
            authPrefix: ''//ensure that ONLY the jwt is in the header
        });
        $httpProvider.interceptors.push('jwtInterceptor'); //attach jwt in every request as Authorization header

        // Remove the ! from the hash so that
        // auth0.js can properly parse it
        $locationProvider.hashPrefix('');

    }


})();
