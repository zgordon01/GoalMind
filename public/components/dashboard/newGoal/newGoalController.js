angular.module('app').controller('NewGoalController', ['$scope', '$state', 'goalService', 'jwtHelper', '$state', function($scope, $state, goalService, jwtHelper, $state){





  $scope.selection;
  $scope.newgoal={};
  $scope.newgoal.notes;
  $scope.newgoal.user_priority;
  $scope.newgoal.due_date;
  $scope.newgoal.repeat_times;
  $scope.buttonPressed = function(){
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
  $scope.setSelection = function(sel){
    $scope.selection=sel;
    $scope.newgoal.goal_type=sel;
  }
  $scope.isPriority=function(){
    if ($scope.selection=="PRIORITY")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.isDueDate=function(){
    if ($scope.selection=="DUEDATE")
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
  /*
  $scope.isProject=function(){
    if ($scope.selection=="PROJECT")
    {
      return true;
    }
    else {
      return false;
    }
  } */
  $scope.clearSelection=function(){
    $scope.selection="";
  }






}]);
