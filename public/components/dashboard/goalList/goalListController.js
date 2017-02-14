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
        console.log("no goals");
        $scope.noGoals=true;
      }
      console.log($scope.goalList);
      //console.log(response);

      console.log("got goals.");
  });
  $scope.goToNewGoal = function() {
    $state.transitionTo("dashboard.newGoal");
  }








}]);
