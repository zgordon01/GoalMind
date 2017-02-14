'use strict';
angular.module('app').controller('HomeController', HomeController);
HomeController.$inject = ['userService', 'authService'];

function HomeController(userService, authService) {
    var hm = this;
    hm.authService = authService;
    userService.init();
}
