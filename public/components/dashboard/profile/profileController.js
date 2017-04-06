angular.module('app').controller('profileController', ['$rootScope', '$scope', '$state', 'goalService', 'userService', 'Flash', function($rootScope, $scope, $state, goalService, userService, flash) {
    $scope.readDates = {};
    getGoals();
    $scope.resetUserObject = function() {
        BootstrapDialog.show({
            title: "WARNING",
            message: "Reset your progress? ",
            buttons: [{
                label: "Delete Everything?",
                cssClass: 'btn-danger',
                action: function(dialog) {
                    userService.updateUser({
                        points: 0,
                        level: 1,
                        pointsToNext: 10
                    }, function(success) {
                        if (!success) {
                            flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
                        } else {
                            goalService.deleteGoal("deleteAll", function(response) {
                                if (response.allDeleted) {
                                    flash.create('info', "<strong>All progress has been reset!</strong>");
                                    getGoals();
                                }
                            });
                        }
                    });
                    dialog.close();
                }
            }, {
                label: "Reset your points from " + $rootScope.userProfile.points + " to 0 and your level from " + $rootScope.userProfile.level + " to 0?",
                cssClass: 'btn-warning',
                action: function(dialog) {
                    userService.updateUser({
                        points: 0,
                        level: 1,
                        pointsToNext: 10
                    }, function(success) {
                        if (!success) {
                            flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
                        } else {
                            flash.create('info', "<strong>Your points and level have been reset!</strong>");
                        }
                    });
                    dialog.close();
                }
            }]
        });
    }

    function getGoals() {
        goalService.getGoalHistory(function(response) {
            $scope.goalList = response;
            response.forEach(function(goal) {
                goal.readableDate = moment(goal.completed_at[0]).format('ddd MM/DD/YY');
                console.log(moment(goal.completed_at[0]).format('ddd MM/DD/YY'));
            });
            if ($scope.goalList == "") {
                console.log("User has no completed/inactive goals.");
                $scope.noGoals = true;
            } else {
                console.log("Received user's completed/inactive goals.");
            }
        });
    }


}]);
//goal.completeDates.forEach(function (eachDate)
