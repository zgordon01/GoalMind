angular.module('app').controller('DashboardController', ['userService', function(userService) {
    var dash = this;
    userService.init();
}]);
