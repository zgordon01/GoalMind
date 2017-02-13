'use strict';
angular.module('app').factory('userService', ['$http', '$rootScope', function(http, $rootScope) {
    return {
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
                $rootScope.userProfile = response.data;
                callback(true);

            }, function errorCallback(response) {//errorCallback do something to inform of error
                callback(false);
            });
        },
        logout : function(){
            localStorage.removeItem('id_token');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('authProfile');
        },
        sync : function(){
            $rootScope.authProfile = JSON.parse(localStorage.getItem('authProfile'));
            $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));
        }
    }
}]);
