'use strict';
angular.module('app').controller('HomeController', HomeController);
HomeController.$inject = ['userService', 'authService'];

function HomeController(userService, authService) {
    var hm = this;
    hm.authService = authService;
    console.log('running home init');
    userService.init();
}
