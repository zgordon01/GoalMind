angular.module('app').controller('profileController', ['$scope', '$state', 'goalService', function($scope, $state, goalService){
  $scope.test = "hi";
  $scope.readDates = {};
  goalService.getGoalHistory(function(response) {
      $scope.goalList=response;
      response.forEach(function (goal) {
        goal.readableDate = moment(goal.completeDates[0]).format('ddd MM/DD/YY');
        console.log(moment(goal.completeDates[0]).format('ddd MM/DD/YY'));
      });
      if($scope.goalList=="")
      {
        console.log("User has no goals.");
        $scope.noGoals=true;
      }
      else {
        console.log("Received user's goals.");
      }
  });


}]);
		//goal.completeDates.forEach(function (eachDate)
