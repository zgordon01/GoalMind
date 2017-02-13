'use strict';
angular.module('app').controller('TestDirectiveController', ['$scope', 'userService','$rootScope', 'Flash', function($scope, userService, $rootScope, flash){
    $scope.updates = {};
    $scope.directiveVar = "variable in directive!!";
    $scope.buttonPressed = function(){
        userService.updateUser({points : $scope.updates.points}, function(success){
            if(!success){
                flash.create('danger', "<strong>OOPS! Something has gone wrong.</strong>");
            }
            else{
                flash.create('success', "<strong>You now have "+ $rootScope.userProfile.points +" points!</strong>");
            }
        });
    }
}]);
