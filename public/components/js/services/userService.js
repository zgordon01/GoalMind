angular.module('app').factory('userService', ['$http', function(http) {
    return {
        mongoAuth: function(user_id, user_token, callback) {
            http({
                method: 'POST',
                url: '/users',
                data: {
                    "user_id": user_id,
                    "user_token": user_token
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) {//successCallback

                callback(response.data.user);

            }, function errorCallback(response) {//errorCallback do something to inform of error

                return "this is bad";//must change at a later date

            });
        }
    }
}]);
