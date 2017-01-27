//angular.module('app').controller('HomeController', HomeController);

angular.module('app').controller('UserHomeController', ['$scope', '$http', '$state', 'authService', function($scope, $http, $state, authService){
//  console.log("Hello World from user home");


if ($scope.isAuthenticated)
{
  console.log("authenticated");
}
else {
  console.log("not authenticated");
  $state.transitionTo('home');
}

$scope.getProfile = localStorage.getItem("userProfile");
$scope.parseProfile = JSON.parse($scope.getProfile);
$scope.displayName = $scope.parseProfile.given_name;



}]);
