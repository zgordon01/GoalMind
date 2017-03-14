angular.module('app').controller('GoalListController', ['$scope', 'goalService', 'jwtHelper', '$state', 'userService', '$rootScope', 'Flash',function($scope, goalService, jwtHelper, $state, userService, $rootScope, flash){

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
        response.forEach(function (goal) {
          goal.readableDate = moment(goal.due_date).format('ddd MM/DD/YY');
        });
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
            response.forEach(function (goal) {
              goal.readableDate = moment(goal.due_date).format('ddd MM/DD/YY');
            });
          }



      });

  }
  $scope.goToNewGoal = function() {
    $state.transitionTo("dashboard.newGoal");
  }
  $scope.setAsComplete = function(goalId, goalTitle) {
    confirmComplete = confirm("Mark the goal '" + goalTitle + "' as complete?");
    if(confirmComplete)
    {
      goalService.setAsComplete(goalId, function(response) {
        userService.updateUser({}, function(success){
            if(!success){
                flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
            }
            else{
                if(response.levelUp){
                    flash.create('success', response.pointsAdded + " points. <strong>You are now level " + $rootScope.userProfile.level+"!</strong>");
                }
                else if(response.demoted){
                    flash.create('warning', response.pointsAdded + " points. <strong>Goal Complete, but you have been demoted to level" + $rootScope.userProfile.level + "</strong>:(");
                }
                else if(response.points){
                    flash.create('success', response.pointsAdded + " points. <strong>Goal Complete.</strong>");
                }
                else{
                    flash.create('success', "<strong>Goal Marked Complete.</strong>");
                }
                $scope.refreshGoals();
            }
        });
      });
    }
  }
}]);
