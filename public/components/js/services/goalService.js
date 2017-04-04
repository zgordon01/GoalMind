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
        getPointHistory: function(callback) {
            http({
                method: 'POST',
                url: '/smartgoals/byuser/pointshistory',
                data: {

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
               var datesArray=[];
                var objkeys = (Object.keys(response.data));
                objkeys.forEach(function(key)
                {
                  var entry = {label: key, value:response.data[key]};
                  datesArray.push(entry);
                });
                callback(datesArray);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue on our end. Try again!");

            });
        },
        newGoal: function(title, notes, user_priority, goal_type, due_date, repeat_times, callback) {
            http({
                method: 'POST',
                url: '/smartgoals',
                data: {
                    "title": title,
                    "notes": notes,
                    "user_priority": user_priority,
                    "goal_type": goal_type,
                    "due_date": due_date,
                    "repeat_times": repeat_times

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
                console.log("service" + response.data.title);
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
                callback(response);

            }, function errorCallback(response) { //errorCallback do something to inform of error
                flash.create('danger', "OOPS! There was an issue on our end. Try again!");
                callback("this is bad"); //must change at a later date

            });
        },
        deleteGoal: function(goal_id, callback) {
            http({
                method: 'DELETE',
                url: '/smartgoals/delete/',
                data: {
                    "goal_id": goal_id
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                if (!response.data.allDeleted) {
                    flash.create('warning', "Goal Deleted.");
                }
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error
                flash.create('danger', "OOPS! There was an issue on our end. Try again!");
                callback("this is bad"); //must change at a later date

            });
        },

        editGoal:function(goal_id, title, notes, user_priority, goal_type, due_date, repeat_times, callback) {
            http({
                method: 'POST',
                url: '/smartgoals/update',
                data: {
                    "goal_id": goal_id,
                    "title": title,
                    "notes": notes,
                    "user_priority": user_priority,
                    "goal_type": goal_type,
                    "due_date": due_date,
                    "repeat_times": repeat_times

                },
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function successCallback(response) { //successCallback
                flash.create('info', "Goal Updated.");
                callback(response.data);

            }, function errorCallback(response) { //errorCallback do something to inform of error

                flash.create('danger', "OOPS! There was an issue making your goal. Try again!");

            });
        }
    }
}]);
