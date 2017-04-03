angular.module('app').controller('GoalListController', ['$scope', 'goalService', 'jwtHelper', '$state', 'userService', '$rootScope', 'Flash', function($scope, goalService, jwtHelper, $state, userService, $rootScope, flash){

/* for showing goals by goal type selected from buttons */
  //$scope.myGoalType="ALL"; //this should default to all goals, currently just DUEDATE goals will appear at first
//  $scope.myOrderBy="urgency_level"
//  $scope.sortItems=false;

  /*
  $scope.myGoalType="ALL"; //this should default to all goals, currently just DUEDATE goals will appear at first
  $scope.myOrderBy="OFF"
  $scope.orderMyGoals=false;
  $scope.sortItems=false;

  */


  $scope.sortItems=false;
  $scope.myOrderBy="urgency_level";

  $scope.myGoalType="ALL";

//  $scope.myGoalType=true;

  $scope.showThisGoalType = function(chosenType){
    if(chosenType=="ALL")
    {
      $scope.myGoalType="ALL"
      $scope.sortItems =false;
    }
    else
    {
      $scope.myGoalType=chosenType;
      $scope.sortItems=true;
    }
  };


  $scope.orderByValue = function(chosenValue){

      $scope.myOrderBy=chosenValue;

  };

  /*
  $scope.showThisGoalType($scope.myGoalType);
  alert($scope.myGoalType);
  $scope.orderByValue($scope.myOrderBy);
  alert($scope.myOrderBy);

  $scope.sortItems=false;
  $scope.myGoalType="REPEAT";
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
        response.forEach(function (goal) {
          goal.duedate = moment(goal.due_date).format('ddd MM/DD/YY');
          goal.created = moment(goal.date_created).format('ddd MM/DD/YY');
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
              goal.duedate = moment(goal.due_date).format('ddd MM/DD/YY');
              goal.created = moment(goal.date_created).format('ddd MM/DD/YY');
              //console.log(moment(goal.completeDates[0]).format('ddd MM/DD/YY'));
            });
          }
      });
  }
  $scope.goToNewGoal = function() {
    $state.transitionTo("dashboard.newGoal");
  }

  $scope.setAsComplete = function(goalId, goalTitle) {
      BootstrapDialog.confirm({
        title: "WARNING",
        message: "Mark the goal '" + goalTitle + "' as complete?",
        type: BootstrapDialog.TYPE_PRIMARY,
        callback: function(confirmComplete) {
          //confirmComplete will be true if button was clicked, while it will be false if user closes the dialog directly.
          if(confirmComplete) {

            goalService.setAsComplete(goalId, function(response) {
                userService.updateUser({}, function(success){
                    if(!success){
                        flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
                    }
                    else{
                        var flashMessage="";
                        if(response.pointsAdded){
                            flashMessage+="Goal Completed. You earned " + response.pointsAdded + " points.";
                        }
                        if(response.levelUp){
                            flashMessage+="\nYou also leveled up! New level: " + $rootScope.userProfile.level;
                        }
                        if(response.demoted){
                            flash.create('warning', response.pointsAdded + " points earned. <strong>Goal Complete, but you have been demoted to level" + $rootScope.userProfile.level + "</strong>:(");
                        }
                        else{
                            flash.create('success', flashMessage);
                        }
                        $scope.refreshGoals();
                    }
                });
            });
          }
        }
      });
  }

}]); //end of controller
