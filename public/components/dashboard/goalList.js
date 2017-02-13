angular.module('app').directive('goalList', function() {
  return {
    restrict: 'E',
    templateUrl: './components/directives/goallist/goalList.html',
    controller: 'GoalListController'
  };
});
