angular.module('app').controller('GoalListController', ['$scope', 'goalService', 'jwtHelper', '$state', function($scope, goalService, jwtHelper, $state){

  /*
  if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
      console.log("auth good");
  } else {
      authManager.unauthenticate();
      $state.transitionTo('home');
  }
  */


  $scope.noGoals=false;
  goalService.getGoals(function(response) {
      $scope.goalList=response;
      if($scope.goalList=="")
      {
        console.log("User has no goals.");
        $scope.noGoals=true;
      }
      else {
        console.log("Received user's goals.");
      }
  });
  $scope.goToNewGoal = function() {
    $state.transitionTo("dashboard.newGoal");
  }
  $scope.setAsComplete = function() {
    confirmComplete = confirm("Mark the goal " + $scope.goal.title + " as complete?");
    if(confirmComplete)
    {
      goalService.setAsComplete($stateParams.goalId, function(response) {
        console.log(response);
        if(response.message == "Goal Complete!")
        {
          //alert(response.message);
          $state.transitionTo("dashboard.goals");
        }
        else {
          //alert("Error with goal..."); //Not sure when this would happen, probably need better error
        }
      });
    }
  }








}]);
