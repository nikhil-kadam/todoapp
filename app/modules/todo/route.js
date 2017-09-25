// Todo module route
(function(){
    
    'use strict'

    angular
        .module('todos',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router'])
        .config(['$stateProvider', stateProvider]);

    function stateProvider($stateProvider) {

        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'app/modules/todo/views/todo.html',
                controller: "todoController"
            })
            .state("editTodo", {
                url: '/editTodo/:id',
                templateUrl : "app/modules/todo/views/editTodo.html",
                controller: 'todoController'
            })
            .state("viewTodo", {
                url: '/viewTodo/:id',
                templateUrl : "app/modules/todo/views/viewTodo.html",
                controller: 'todoController'
            })
    }
    
})();
    