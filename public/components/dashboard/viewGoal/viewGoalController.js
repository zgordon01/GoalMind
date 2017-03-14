angular.module('app').controller('ViewGoalController', ['$scope', '$state', '$stateParams', 'goalService', 'jwtHelper', '$state', function($scope, $state, $stateParams, goalService, jwtHelper, $state) {

    if ($stateParams.goalId) {
        goalService.getSingleGoal($stateParams.goalId, function(response) {
            $scope.goal = response;
            //console.log(response);
        });
    } else {
        //if you refresh on the view goal page, the stateparams will be null. This causes a 400 error and the page will just be blank
        //Another way to handle this would be to temporarily store the stateparams in sessionstorage and check there if null
        console.log("No state params, sending to goalList");
        $state.transitionTo("dashboard.goals");
    }

    $scope.setAsComplete = function() {
        confirmComplete = confirm("Mark the goal as complete?");
        if (confirmComplete) {
            goalService.setAsComplete($stateParams.goalId, function(response) {
                console.log(response);
                //alert(response.message);
                $state.transitionTo("dashboard.goals");
                else {
                    //alert("Error with goal..."); //Not sure when this would happen, probably need better error
                }
            });
        }
    }

    $scope.deleteGoal = function() {
        confirmDelete = confirm("Are you sure you want to delete this goal? This is not the same as completing it.");
        if (confirmDelete) {
            goalService.deleteGoal($stateParams.goalId, function(response) {
                if (response.message == "Goal Deleted") {
                    //console.log(response);
                    //lert(response.message);
                    $state.transitionTo("dashboard.goals");
                } else {
                    //alert("error deleting goal..."); //better message here
                }
            })
        }
    }
}]);
