angular.module('app').directive('myTest', function() {
  return {
    restrict: 'E',
    templateUrl: './components/directives/example/testDirective.html',
    controller: 'TestDirectiveController'
  };
});
