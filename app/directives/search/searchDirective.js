// navbar directive
(function() {
    
    'use strict';

    angular.module("Todo").directive('searchDirective', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/search/views/search.html',
            link: function(scope, element, attrs) {

            },
            controller: function($scope,$state) {

                // create todo
                $scope.createTodo = function(){
                    $state.go("todo");
                };
            }
        };
    });
})();