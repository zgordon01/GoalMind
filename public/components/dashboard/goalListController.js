angular.module('app').controller('GoalListController', ['$scope', 'goalService', function($scope, goalService){





  goalService.getGoals(function(response) {
      $scope.goalList=response;
      //console.log(response);
  });








}]);
