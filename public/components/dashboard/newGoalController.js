angular.module('app').controller('NewGoalController', ['$scope', '$state', 'goalService', function($scope, $state, goalService){

  $scope.newgoal={};
  $scope.buttonPressed = function(){
      goalService.newGoal($scope.newgoal.title, $scope.newgoal.description, $scope.newgoal.priority, $scope.newgoal.goal_type, $scope.newgoal.due_date, $scope.newgoal.repeat, function(response){
      //console.log(response);
      if (response.message=="Created Goal")
      {
        $state.transitionTo("dashboard.goals");
      }
  })};

  goalService.getGoals(function(response) {
      $scope.goalList=response;
      //console.log(response);
  });




}]);
