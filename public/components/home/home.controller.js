(function () {

  'use strict';

  angular.module('app').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', '$http', 'authService'];

  function HomeController($scope, $state, $http, authService) {

    var vm = this;
    vm.authService = authService;
    $scope.searchResults={};

    $http.get



  }

}());
