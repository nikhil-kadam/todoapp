// todo controller
(function() {
	
	'use strict',

	angular.module("todos").controller('todoController',function($state,$scope,toastr,$location,todoService,$sessionStorage,$stateParams){

		var todoID = $stateParams.id;

		// variable object
		$scope.todosDetails = {
			"name" : "",
			"todoDate" : "",
			"isReminder" : "",
			"reminderDate" : "",
			"isPublic" : "",
			"status" : "",
			"officeCategory" : "",
			"trainingcategory" : ""
		};

		// load todo details
		var init = function(){
			var todoDetails = todoService.fetchTodoDetails(todoID);

			if(typeof todoDetails !== 'undefined'){ 
				// set values
				$scope.todosDetails.name = todoDetails.name;
				$scope.todosDetails.todoDate = todoDetails.todoDate;
				$scope.todosDetails.isReminder = todoDetails.isReminder;
				$scope.todosDetails.reminderDate = todoDetails.reminderDate;
				$scope.todosDetails.isPublic = todoDetails.isPublic;
				$scope.filepreview = todoDetails.image;
				$scope.todosDetails.status = todoDetails.status;
				$scope.todosDetails.officeCategory = todoDetails.categories.office;
				$scope.todosDetails.trainingcategory = todoDetails.categories.training;
			}
		};

		// load init 
		init();

		// create todo
		$scope.createTodo = function(){

			if($scope.todoForm.$valid){

				// post data
				var postData = {
					"name" : $scope.todosDetails.name,
					"todoDate" : $scope.todosDetails.todoDate,
					"isReminder" : $scope.todosDetails.isReminder,
					"reminderDate" : $scope.todosDetails.reminderDate,
					"isPublic" : $scope.todosDetails.isPublic,
					"filepreview" : $scope.filepreview,
					"officeCategory" : $scope.todosDetails.officeCategory,
					"trainingcategory" : $scope.todosDetails.trainingcategory
				};
				
				// check if todo details stored
				if(todoService.storeTodoDetails(postData)){
					
					// display message
					toastr.success("Added successfully");

					// redirect to login
					$state.go('home');
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}
			}
		};

		// edit todo
		$scope.editTodo = function(){

			if($scope.todoForm.$valid){

				// post data
				var postData = {
					"name" : $scope.todosDetails.name,
					"todoDate" : $scope.todosDetails.todoDate,
					"isReminder" : $scope.todosDetails.isReminder,
					"reminderDate" : $scope.todosDetails.reminderDate,
					"isPublic" : $scope.todosDetails.isPublic,
					"status" : $scope.todosDetails.status,
					"filepreview" : $scope.filepreview,
					"officeCategory" : $scope.todosDetails.officeCategory,
					"trainingcategory" : $scope.todosDetails.trainingcategory
				};
				
				// check if todo details stored
				if(todoService.updateTodoDetails(todoID,postData)){

					// display message
					toastr.success("Updated successfully");

					// redirect to login
					$state.go('viewTodo',{"id":todoID});
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}				
			}
		};
	});
})();