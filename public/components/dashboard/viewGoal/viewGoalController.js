angular.module('app').controller('ViewGoalController', ['$scope', '$state', '$stateParams', 'goalService', 'jwtHelper', '$state', function($scope, $state, $stateParams, goalService, jwtHelper, $state) {

    if ($stateParams.goalId) {
        goalService.getSingleGoal($stateParams.goalId, function(response) {
            $scope.goal = response;
            //console.log(response);
        });
    }
    else{
        //if you refresh on the view goal page, the stateparams will be null. This causes a 400 error and the page will just be blank
        //Another way to handle this would be to temporarily store the stateparams in sessionstorage and check there if null
        console.log("No state params, sending to goalList");
        $state.transitionTo("dashboard.goals");
    }

  $scope.setAsComplete = function() {

    BootstrapDialog.confirm({

      title: "WARNING",
      message: "Mark the goal as complete?",
      type: BootstrapDialog.TYPE_PRIMARY,

      callback: function(confirmComplete){
        //confirmComplete will be true if button was click, while it will be false if user closes the dialog directly.
        if(confirmComplete) {

          goalService.setAsComplete($stateParams.goalId, function(response) {
            console.log(response);
            if(response.points){
              //alert(response.message);
              $state.transitionTo("dashboard.goals");
            }
          });
        }
        else {
          //alert("Error with goal..."); //Not sure when this would happen, probably need better error
        }
      }
    });
  }



  $scope.deleteGoal = function() {

    BootstrapDialog.confirm({

      title: "WARNING",
      message: "Are you sure you want to delete this goal? This is not the same as completing it.",
      type: BootstrapDialog.TYPE_PRIMARY,

      callback: function(confirmComplete){
        //confirmComplete will be true if button was click, while it will be false if user closes the dialog directly.
        if(confirmComplete) {

          goalService.deleteGoal($stateParams.goalId, function(response) {

            if(response.message == "Goal Deleted"){

              //console.log(response);
              //alert(response.message);
              $state.transitionTo("dashboard.goals");
            }
          });
        }
        else {
          //alert("error deleting goal..."); //better message here
        }
      }
    });
  }

}]);
