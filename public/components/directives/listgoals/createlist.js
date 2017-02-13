angular.module('app').directive('karlaDir', function() {
  return {
    restrict: 'E',
    templateUrl: './components/directives/listgoals/createlist.html',
    controller: 'createlistController'
  };
});
