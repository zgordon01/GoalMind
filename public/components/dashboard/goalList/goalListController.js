angular.module('app').controller('GoalListController', ['$scope', 'goalService', 'jwtHelper', '$state', 'userService', '$rootScope', 'Flash', function($scope, goalService, jwtHelper, $state, userService, $rootScope, flash){
  
/* for showing goals by goal type selected from buttons */
  $scope.myGoalType=" SINGLE"; //this should default to all goals, currently just single goals will appear at first

  $scope.showOpenGoal = function() {
    $scope.myGoalType = 'OPEN';
  }
  $scope.showSingleGoal = function() {
    $scope.myGoalType = 'SINGLE';
  }
  $scope.showRepeatType = function() {
    $scope.myGoalType = 'REPEAT';
  }


  /* for ordering by goal type from buttons */
  $scope.orderByValue = 'priorityLevel'; //defualt to ordering by priority level (num)

  $scope.orderByPriorityLevel = function(){
    $scope.orderByValue = 'priorityLevel';
  }
  $scope.orderByTitle = function(){
    $scope.orderByValue = 'title';
  }
  $scope.orderByDueDate = function(){
    $scope.orderByValue = 'due_date';
  }
  $scope.orderByDateCreated = function(){
    $scope.orderByValue = 'date_created';
  }


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
          goal.created = moment(goal.created_on).format('ddd MM/DD/YY');
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
              goal.created = moment(goal.created_on).format('ddd MM/DD/YY');
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
      });
  }

}]); //end of controller
