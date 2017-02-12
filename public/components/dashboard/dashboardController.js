angular.module('app').controller('DashboardController', ['userService', function(userService) {
    init();

    function init() {
        console.log("dash init ran");
        userService.sync();
    }
    var dash = this;
}]);
