(function() {

    'use strict';

    angular
        .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngFlash'])
        .config(config);

    config.$inject = ['$stateProvider', 'lockProvider', 'jwtOptionsProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'FlashProvider'];

    function config($stateProvider, lockProvider, jwtOptionsProvider, $locationProvider, $urlRouterProvider, $httpProvider, FlashProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: './components/home/home.html',
                controllerAs: 'hm'
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
            domain: 'zgordon01.auth0.com',
            options: {
                languageDictionary: {
                    emailInputPlaceholder: "something@youremail.com",
                    title: "SmartGoals"
                },
                rememberLastLogin: false,
                theme : {
                    primaryColor: '#4dd149'
                }
            }
        });
        // Configuration for angular-jwt
        jwtOptionsProvider.config({
            tokenGetter: function() {
                return localStorage.getItem('id_token');
            },
            authPrefix: '' //ensure that ONLY the jwt is in the header
        });
        $httpProvider.interceptors.push('jwtInterceptor'); //attach jwt in every request as Authorization header

        // Remove the ! from the hash so that
        // auth0.js can properly parse it
        $locationProvider.hashPrefix('');

        //setup angular-flash messages
        FlashProvider.setTimeout(5000);
        FlashProvider.setShowClose(false);

    }


})();
