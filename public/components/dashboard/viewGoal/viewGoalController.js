angular.module('app').controller('ViewGoalController', ['$scope', '$state', '$stateParams', 'goalService', 'jwtHelper', '$state', function($scope, $state, $stateParams, goalService, jwtHelper, $state){
  
  if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
      console.log("auth good");
  } else {
      authManager.unauthenticate();
      $state.transitionTo('home');
  }




  if ($stateParams.goalId)
  {
    goalService.getSingleGoal($stateParams.goalId, function(response) {
        $scope.goal=response;
        //console.log(response);
    });
  }
  else
  {
    //if you refresh on the view goal page, the stateparams will be null. This causes a 400 error and the page will just be blank
    //Another way to handle this would be to temporarily store the stateparams in sessionstorage and check there if null
    console.log("No state params, sending to goalList");
    $state.transitionTo("dashboard.goals");
  }





}]);
