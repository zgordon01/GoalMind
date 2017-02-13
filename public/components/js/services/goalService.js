angular.module('app').factory('goalService', ['$http', function(http) {

    return {
        myTest: function(para) {
            alert(para);
        },
        getGoals : function(callback){
            http({
                method: 'POST',
                url: '/smartgoals/byuser',
                data: {

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
        newGoal : function(title, description, priority, goal_type, due_date, repeat, callback){
            http({
                method: 'POST',
                url: '/smartgoals',
                data: {
                  "title": title,
                  "description": description,
                  "priority": priority,
                  "goal_type": goal_type,
                  "due_date": due_date,
                  "repeat": repeat

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) {//successCallback
                callback(response.data);

            }, function errorCallback(response) {//errorCallback do something to inform of error

                return "this is bad";//must change at a later date

            });
        }
    }
}]);
