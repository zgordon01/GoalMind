angular.module('app').controller('NewGoalController', ['$scope', '$state', 'goalService', 'jwtHelper', '$state', function($scope, $state, goalService, jwtHelper, $state){


  $scope.whichDate;
  $scope.selection;
  $scope.newgoal={};
  $scope.newgoal.notes;
  $scope.newgoal.user_priority;
  $scope.newgoal.due_date;
  $scope.newgoal.repeat_times;
  $scope.priorityNumber=1;
  $scope.repeatNumber;
  $scope.priorityNumToStr = function(num)
  {
    if(num==5)
    {
      var returnStr = 'Within 3 Weeks';
      return returnStr;
    }
    else if(num==4)

    {
      returnStr = 'Within 2 Weeks';
      return returnStr;
    }
    else if(num==3)
    {
      returnStr = 'Within 10 Days';
      return returnStr;
    }
    else if(num==2)
    {
      returnStr = 'Within 1 Week';
      return returnStr;
    }
    else if(num==1)
    {
      returnStr = 'Within 3 Days';
      return returnStr;
    }
  }
  $scope.isQuickSet = function(){
    if ($scope.selection == "QUICKSET")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.isSetDate = function(){
    if ($scope.selection == "SETDATE")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.isRepeat=function(){
    if ($scope.selection=="REPEAT")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.setSetDate = function(){
    $scope.selection="SETDATE";
  }
  $scope.setQuickSet = function(){
    $scope.selection="QUICKSET"
  }
  $scope.setRepeatGoal = function(){
    $scope.selection="REPEAT";
  }

  $scope.buttonPressed = function(){
      if ($scope.isQuickSet())
      {
        if (  $scope.priorityNumber==1 )
        {
          var date = new Date();
          date.setDate(date.getDate() +3);
          $scope.newgoal.due_date = date;
        }
        else if (  $scope.priorityNumber==2 )
        {
          var date = new Date();
          date.setDate(date.getDate() +7);
          $scope.newgoal.due_date = date;
        }
        else if ( $scope.priorityNumber ==3 )
        {
          var date = new Date();
          date.setDate(date.getDate() +10);
          $scope.newgoal.due_date = date;
        }
        else if ( $scope.priorityNumber == 4 )
        {
          var date = new Date();
          date.setDate(date.getDate() +14);
          $scope.newgoal.due_date = date;
        }
        else if ( $scope.priorityNumber == 5 )
        {
          var date = new Date();
          date.setDate(date.getDate() +21);
          $scope.newgoal.due_date = date;
        }
        $scope.newgoal.goal_type = "DUEDATE";
      }
      else if ($scope.isSetDate())
      {
        $scope.newgoal.goal_type = "DUEDATE";

      }
      else if ($scope.isRepeat())
      {
        $scope.newgoal.repeat_times = $scope.repeatNumber;
        $scope.newgoal.goal_type = "REPEAT"
      }


      goalService.newGoal($scope.newgoal.title, $scope.newgoal.notes, $scope.newgoal.user_priority, $scope.newgoal.goal_type, $scope.newgoal.due_date, $scope.newgoal.repeat_times, function(response){
      //console.log(response);
      if (response.message=="Created Goal")
      {
        $state.transitionTo("dashboard.goals");
      }
      else {
        //alert("error making goal");
        console.log("error");
        alert(response.message);
      }

  })};

  goalService.getGoals(function(response) {
      $scope.goalList=response;
      console.log(response);
  });

  $scope.clearSelection=function(){
    $scope.selection="";
  }

}]);
