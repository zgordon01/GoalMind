angular.module('app').controller('NewGoalController', ['$scope', '$state', 'goalService', 'jwtHelper', '$state', function($scope, $state, goalService, jwtHelper, $state){

  $scope.selection;
  $scope.newgoal={};
  $scope.buttonPressed = function(){
      goalService.newGoal($scope.newgoal.title, $scope.newgoal.notes, $scope.newgoal.priority, $scope.newgoal.goal_type, $scope.newgoal.due_date, $scope.newgoal.repeat, function(response){
      //console.log(response);
      if (response.message=="Created Goal")
      {
        $state.transitionTo("dashboard.goals");
      }
      else {
        //alert("error making goal");
        console.log("error");
      }


  })};

  goalService.getGoals(function(response) {
      $scope.goalList=response;
      //console.log(response);
  });
  $scope.setSelection = function(sel){
    $scope.selection=sel;
    $scope.newgoal.goal_type=sel;
  }
  $scope.isOpen=function(){
    if ($scope.selection=="OPEN")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.isSingle=function(){
    if ($scope.selection=="SINGLE")
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
  $scope.isProject=function(){
    if ($scope.selection=="PROJECT")
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.clearSelection=function(){
    $scope.selection="";
  }






}]);
