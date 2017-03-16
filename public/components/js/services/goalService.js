angular.module('app').factory('goalService', ['$http', 'Flash', function(http, flash) {

    return {
        myTest: function(para) {
            alert(para);
        },
        getGoals: function(callback) {
            http({
                method: 'POST',
                url: '/smartgoals/byuser',
                data: {

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue on our end. Try again!");

            });
        },
        getGoalHistory: function(callback) {
            http({
                method: 'POST',
                url: '/smartgoals/byuser/history',
                data: {

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue on our end. Try again!");

            });
        },
        newGoal: function(title, notes, priority, goal_type, due_date, repeat, callback) {
            http({
                method: 'POST',
                url: '/smartgoals',
                data: {
                    "title": title,
                    "notes": notes,
                    "priority": priority,
                    "goal_type": goal_type,
                    "due_date": due_date,
                    "repeat": repeat

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                flash.create('info', "Goal created.");
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue making your goal. Try again!");

            });
        },
        getSingleGoal: function(goal_id, callback) {
            http({
                method: 'POST',
                url: '/smartgoals/view',
                data: {
                    "goal_id": goal_id


                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue on our end. Try again!");

            });
        },
        setAsComplete: function(goal_id, callback) {
            http({
                method: 'POST',
                url: '/smartgoals/complete',
                data: {
                    "goal_id": goal_id


                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error
                flash.create('danger', "OOPS! There was an issue on our end. Try again!");
                callback("this is bad"); //must change at a later date

            });
        },
        deleteGoal: function(goal_id, callback) {
            http({
                method: 'DELETE',
                url: '/smartgoals/delete/' + goal_id,
                data: {
                    "goal_id": goal_id


                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                flash.create('success', "Goal Deleted.");
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error
                flash.create('danger', "OOPS! There was an issue on our end. Try again!");
                callback("this is bad"); //must change at a later date

            });
        }
    }
}]);
