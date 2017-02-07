angular.module('app').factory('userService', ['$http', 'profileService',function(http, profileService) {
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

                callback(response.data);

            }, function errorCallback(response) {//errorCallback do something to inform of error

                return "this is bad";//must change at a later date

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
                profileService.setUserProfile(response.data);
                callback(response.data);

            }, function errorCallback(response) {//errorCallback do something to inform of error

                return "this is bad";//must change at a later date

            });
        }
    }
}]);
