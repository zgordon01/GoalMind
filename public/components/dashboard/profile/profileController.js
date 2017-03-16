angular.module('app').controller('profileController', ['$rootScope', '$scope', '$state', 'goalService', 'userService', 'Flash', function($rootScope, $scope, $state, goalService, userService, flash){
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
  $scope.resetUserObject = function(){
      BootstrapDialog.confirm({
        title: "WARNING",
        message: "Reset your points from " + $rootScope.userProfile.points + " to 0 and your level from " + $rootScope.userProfile.level + " to 0?",
        type: BootstrapDialog.TYPE_DANGER,
        callback: function(confirmComplete) {
          //confirmComplete will be true if button was clicked, while it will be false if user closes the dialog directly.
          if(confirmComplete) {
              userService.updateUser({points : 0, level : 1, pointsToNext : 10}, function(success){
                  if(!success){
                      flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
                  }
                  else{
                      flash.create('info', "<strong>Your progress has been reset!</strong>");
                  }
              });
          }
        }
      });
  }


}]);
		//goal.completeDates.forEach(function (eachDate)
