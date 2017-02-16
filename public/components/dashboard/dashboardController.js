angular.module('app').controller('DashboardController', ['userService', function(userService) {
    var dash = this;
    console.log('running dash init');
    userService.init();
}]);
