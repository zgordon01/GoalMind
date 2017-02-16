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
            .state('home.about', {
              url: 'about',
              templateUrl: './components/home/about.html'
            })
            .state('home.features', {
              url: 'features',
              templateUrl: './components/home/features.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                templateUrl: './components/dashboard/dashboard.html',

                controllerAs: 'dash'
            })
            .state('dashboard.goals', {
                url: '/goals',
                templateUrl: './components/dashboard/goalList/goalList.html',
                controller: "GoalListController"

            }).state('dashboard.newGoal', {
                url: '/newgoal',
                templateUrl: './components/dashboard/newGoal/newGoal.html',
                controller: 'NewGoalController'

            }).state('dashboard.viewGoal', {
                url: '/viewgoal',
                templateUrl: './components/dashboard/viewGoal/viewGoal.html',
                params : { goalId: null, hiddenParam:'YES',},
                controller: 'ViewGoalController'

            })

            .state('dashboard.calendar', {
                url: '/calendar',
                templateUrl: './components/dashboard/calendar.html'

            })
            .state('dashboard.graph', {
                url: '/graph',
                templateUrl: './components/dashboard/graph.html'

            });
        //$urlRouterProvider.otherwise('/');
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
