(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', 'goalService'];

  function HomeController(authService, goals) {

    var vm = this;
    vm.authService = authService;
    goals.myTest("hello!");

    
  }

}());
