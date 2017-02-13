angular.module('app').controller('NewGoalController', ['$scope', '$state', 'goalService', 'jwtHelper', '$state', function($scope, $state, goalService, jwtHelper, $state){
  /*
  if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
      console.log("auth good");
  } else {
      authManager.unauthenticate();
      $state.transitionTo('home');
  }
  */

  $scope.selection;
  $scope.newgoal={};
  $scope.buttonPressed = function(){
      goalService.newGoal($scope.newgoal.title, $scope.newgoal.description, $scope.newgoal.priority, $scope.newgoal.goal_type, $scope.newgoal.due_date, $scope.newgoal.repeat, function(response){
      //console.log(response);
      if (response.message=="Created Goal")
      {
        $state.transitionTo("dashboard.goals");
      }
      else {
        alert("error making goal");
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
    console.log(sel);
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

  function init() {
      console.log("home init ran");
      if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
          console.log("auth good");
      } else {
          authManager.unauthenticate();
          $state.transitionTo('home');
      }
  }




}]);
