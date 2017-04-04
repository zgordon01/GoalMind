angular.module('app').controller('ViewGoalController', ['$scope', '$state', '$stateParams', 'goalService', 'jwtHelper', '$state', function($scope, $state, $stateParams, goalService, jwtHelper, $state) {
    $scope.goal;
  $scope.edit;

    if ($stateParams.goalId) {
        goalService.getSingleGoal($stateParams.goalId, function(response) {
            //$scope.goal = JSON.stringify(response.data);
            console.log(response);
            console.log(JSON.stringify(response));
            $scope.goal=response;
            $scope.originalValues=angular.copy($scope.goal);
            $scope.edit=angular.copy($scope.goal);
            //var keys=Object.keys($scope.edit);
            Object.getOwnPropertyNames($scope.edit).forEach(
              function (val, idx, array) {
                console.log(val + ' -> ' + $scope.edit[val]);
                $scope.edit[val]=false;
                console.log(val + ' -> ' + $scope.edit[val]);
              }
            );


            console.log($scope.edit);
            console.log($scope.goal);
            console.log($scope.originalValues);
            //console.log(JSON.stringify(response.data));
            //alert(response.data.title);
            //console.log($scope.goal);




            //console.log(response);
        });
    }
    else{
        //if you refresh on the view goal page, the stateparams will be null. This causes a 400 error and the page will just be blank
        //Another way to handle this would be to temporarily store the stateparams in sessionstorage and check there if null
        console.log("No state params, sending to goalList");
        $state.transitionTo("dashboard.goals");
    }

//  $scope.edit.title=false;
  $scope.resetValues = function() {
    Object.getOwnPropertyNames($scope.goal).forEach(
      function (val, idx, array) {
        if(!$scope.edit[val])
        {
          $scope.goal[val]=$scope.originalValues[val];
        };

      }
    );
  };
  $scope.setVal =function(value) {
    console.log(value);
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
            if(response){
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


  $scope.editGoal = function() {
    console.log("UPDATE");
    goalService.editGoal($stateParams.goalId, $scope.goal.title, $scope.goal.notes, $scope.goal.user_priority, $scope.goal.goal_type, $scope.goal.due_date, $scope.goal.repeat_times, function(response){

      console.log(response);
      if(response.message){
        //alert(response.message);
        $state.transitionTo("dashboard.goals");
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

            if(response.message){

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
