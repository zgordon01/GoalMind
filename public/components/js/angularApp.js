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
                },
                controllerAs: 'dash'
            })
            .state('dashboard.goals', {
                url: '/goals',
                templateUrl: './components/dashboard/goals.html'

            }).state('dashboard.calendar', {
                url: '/calendar',
                templateUrl: './components/dashboard/calendar.html'

            });
        $urlRouterProvider.otherwise('/');
        lockProvider.init({
            clientID: 'GkzbEfm3t2d2DNUgAYkUZnR7X9pLcpn5',
            domain: 'zgordon01.auth0.com',
            options: {
                languageDictionary: {
                    title: "SmartGoals"
                },
                rememberLastLogin: false,
                theme : {
                    //pick color
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
        FlashProvider.setTimeout(4000);
        FlashProvider.setShowClose(false);
        FlashProvider.setAutoDismiss(true);
        FlashProvider.setTemplate(`
        <div style="text-align:center; margin-bottom:0px;" role="alert" id="{{flash.config.id}}" class="alert {{flash.config.class}} alert-{{flash.type}} alert-dismissible alertIn alertOut">
            <div type="button" class="close" ng-if="flash.showClose" close-flash="{{flash.id}}">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </div>
            <span dynamic="flash.text"></span>
        </div>
    `);

    }


})();
