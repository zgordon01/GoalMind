angular.module('app').controller('TestDirectiveController', ['$scope', 'profileService', 'userService','$rootScope', function($scope, profileService, userService, $rootScope){
    $scope.updates = {};
    $rootScope.userProfile = profileService.getUserProfile();
    $scope.directiveVar = "variable in directive!!";
    $scope.buttonPressed = function(){
        userService.updateUser({points : $scope.updates.points}, function(res){
            $rootScope.userProfile = res;
        });
    }
}]);
