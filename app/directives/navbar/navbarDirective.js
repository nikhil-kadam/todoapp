// navbar directive

(function() {
    
    'use strict';

    angular.module("Todo").directive('navbarDirective', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/navbar/views/navbar.html',
            link: function(scope, element, attrs) {

            },
            controller: function($scope,$state) {
                // todo list
                $scope.todoList = function(){
                    // redirect to login
                    $state.go('home');
                };

                // logout
                $scope.logout = function(){
                    sessionStorage.clear();
                    $state.go('login');
                };

                // redirect to edit form submit
                $scope.editProfile = function() {
                    $state.go("edit");
                };
            }
        };
    });
})();