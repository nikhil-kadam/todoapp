// navbar directive
app.directive('searchDirective', function ($location) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/search.html',
        link: function(scope, element, attrs) {

        },
        controller: function($scope) {
            // todo list
            $scope.todoList = function(){
                // redirect to login
                $location.path('/home');
            };

            // logout
            $scope.logout = function(){
                sessionStorage.clear();
                $location.path('/login');
            };

            // redirect to edit form submit
            $scope.editProfile = function() {
                $location.path("/edit");
            };

            // create todo
            $scope.createTodo = function(){
                $location.path("/todo");
            };
        }
    };
});