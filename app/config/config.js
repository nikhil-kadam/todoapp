// angular app
var app = angular.module('Todo',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router']);

// configure
app.config(function($locationProvider,toastrConfig,$stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('registration', {
	       url: '/registration',
	       templateUrl: 'app/views/registration.html',
	       controller: "registrationController"
	   	})

		.state('login', {
	       url: '/login',
	       templateUrl: 'app/views/login.html',
	       controller: "loginController",
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	   	})

	   	.state("home", {
	   		url: '/home',
	        templateUrl : "app/views/home.html",
	        controller: 'homeController',
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	    })
	    .state("edit", {
	    	url: '/edit',
	        templateUrl : "app/views/edit.html",
	        controller: 'editController',
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	    })
	    .state("todo", {
	    	url: '/todo',
	        templateUrl : "app/views/todo.html",
	        controller: 'todoController',
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	    })
	    .state("editTodo", {
	    	url: '/editTodo/:id',
	        templateUrl : "app/views/editTodo.html",
	        controller: 'todoController',
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	    })
	    .state("viewTodo", {
	    	url: '/viewTodo/:id',
	        templateUrl : "app/views/viewTodo.html",
	        controller: 'todoController',
		    resolve:{
		        loggedIn:onlyLoggedIn
		    }
	    })

	// toastr config
	angular.extend(toastrConfig, {
	    autoDismiss: false,
	    containerId: 'toast-container',
	    maxOpened: 0,    
	    newestOnTop: true,
	    positionClass: 'toast-top-right',
	    preventDuplicates: false,
	    preventOpenDuplicates: false,
	    target: 'body',
	    timeOut: 2000
	});

});

// check user logged in
var onlyLoggedIn = function ($location,$q,loginService,$state) {
    var deferred = $q.defer();
    if (loginService.isLoggedIn()) {
        deferred.resolve();
    } else {
        deferred.resolve();
        $location.path('/login');
    }
    return deferred.promise;
};