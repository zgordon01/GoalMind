'use strict';
angular.module('app').factory('userService', ['$http', '$rootScope', 'lock', 'jwtHelper', '$state', 'Flash', 'authManager', function(http, $rootScope, lock, jwtHelper, $state, flash, authManager) {
    var functions = {
        mongoAuth: function(user_id, callback) {
            http({
                method: 'POST',
                url: '/users',
                data: {
                    "user_id": user_id
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) {//successCallback
                localStorage.setItem('userProfile', JSON.stringify(response));
                callback(true);
            }, function errorCallback(response) {//errorCallback do something to inform of error
                callback(false)
            });
        },
        updateUser : function(updates, callback){
            http({
                method: 'POST',
                url: '/users/updateUser',
                data: {
                    updates
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) {//successCallback
                localStorage.setItem('userProfile', JSON.stringify(response.data));
                functions.sync();
                callback(true);

            }, function errorCallback(response) {//errorCallback do something to inform of error
                callback(false);
            });
        },
        logout : function(){
            localStorage.removeItem('id_token');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('authProfile');
            $rootScope.authProfile = {};
            $rootScope.userProfile = {};
        },
        sync : function(){
            $rootScope.authProfile = JSON.parse(localStorage.getItem('authProfile'));
            $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));
        },
        init : function(){
            console.log("userService init ran");
            if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
                console.log("access token expires in " + jwtHelper.getTokenExpirationDate(localStorage.getItem('id_token')));
                console.log("init logged in");
                authManager.authenticate();
                lock.getProfile(localStorage.getItem('id_token'), function(error, profile) {
                    if (error) {
                        flash.create('danger', "We are having trouble getting your information. Try refreshing the page!");
                    } else {
                        functions.updateUser({}, function(success) {
                            if (success) {
                                $state.go('dashboard.goals');
                                localStorage.setItem('authProfile', JSON.stringify(profile));
                                $rootScope.authProfile = profile;
                            }
                        });
                    }
                });
            }
            else {
                console.log("init logged out");
                functions.logout();
                authManager.unauthenticate();
                $state.go('home');
            }

        }
    }
    return functions;
}]);
