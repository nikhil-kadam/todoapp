// angular app
var app = angular.module('Todo',['ngRoute','toastr','ngStorage','angular-md5','720kb.datepicker']);

// configure
app.config(function($routeProvider,$locationProvider,toastrConfig) {

	// routes
    $routeProvider
	    .when("/registration", {
	        templateUrl : "app/views/registration.html",
	        controller: "registrationController"
	    })
	    .when("/login", {
	        templateUrl : "app/views/login.html",
	        controller: 'loginController',
	    })
	    .when("/home", {
	        templateUrl : "app/views/home.html",
	        controller: 'homeController'
	    })
	    .when("/edit", {
	        templateUrl : "app/views/edit.html",
	        controller: 'editController'
	    })
	    .when("/todo", {
	        templateUrl : "app/views/todo.html",
	        controller: 'todoController'
	    })
	    .otherwise({ redirectTo: '/login' });

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