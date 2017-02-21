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
  $scope.refreshGoals=function()
  {
      goalService.getGoals(function(response) {
          $scope.goalList=response;
          if($scope.goalList=="")
          {
            console.log("User has no goals.");
            $scope.noGoals=true;
          }
          else {
            console.log("User's goals refreshed.");
          }
        


      });

  }
  $scope.goToNewGoal = function() {
    $state.transitionTo("dashboard.newGoal");
  }
  $scope.setAsComplete = function(goalId) {
    confirmComplete = confirm("Mark the goal as complete?");
    if(confirmComplete)
    {
      goalService.setAsComplete(goalId, function(response) {
        if(response.message == "Goal Complete!")
        {
          $scope.refreshGoals();
          scroll(0,0);
          //jquery scroll to top with animation, doesnt seem to work: $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
      });
    }
  }
}]);
