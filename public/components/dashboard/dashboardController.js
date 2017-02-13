angular.module('app').controller('DashboardController', ['$state', 'authService', 'profileService', 'jwtHelper', '$state', 'authManager', function($state, authService, profileService, jwtHelper, $state, authManager) {
  if (localStorage.getItem('id_token') && !jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
      console.log("auth good");
  } else {
      authManager.unauthenticate();
      $state.transitionTo('home');
    }

  var dash = this;




    init();

    function init() {
        console.log("dash init ran");
        userService.sync();
    }
    var dash = this;
}]);
