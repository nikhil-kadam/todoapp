// home controller
app.controller('todoController',function($scope,toastr,$location,todoService,$sessionStorage,$stateParams){

	var todoID = $stateParams.id;

	// set watch for variable
	$scope.$watch('todoID', function() {
		var todoDetails = todoService.fetchTodoDetails(todoID);

		if(typeof todoDetails !== 'undefined'){
	        // set values
	        $scope.name = todoDetails.name;
	        $scope.todoDate = todoDetails.todoDate;
	        $scope.isReminder = todoDetails.isReminder;
	        $scope.reminderDate = todoDetails.reminderDate;
	        $scope.isPublic = todoDetails.isPublic;
	        $scope.filepreview = todoDetails.image;
	        $scope.status = todoDetails.status;
	        $scope.officeCategory = todoDetails.categories.office;
	        $scope.trainingcategory = todoDetails.categories.training;
	    }
    }); 

	// create todo
	$scope.createTodo = function($event){
		$event.preventDefault();

		if($scope.todoForm.$invalid){
			// set submitted true
			$scope.todoForm.$submitted = true;

			// display message
			toastr.error('Please fill up required details', 'Error');
			
		}else{

			// check if todo details stored
			if(todoService.storeTodoDetails($scope)){

				// display message
				toastr.success("Added successfully");

				// redirect to login
				$location.path('/home');
			}else{
				// display message
				toastr.error('Failed to store details', 'Error');
			}
		}
	};

	// edit todo
	$scope.editTodo = function($event){
		$event.preventDefault();

		if($scope.todoForm.$invalid){
			// set submitted true
			$scope.todoForm.$submitted = true;

			// display message
			toastr.error('Please fill up required details', 'Error');
			
		}else{

			// check if todo details stored
			if(todoService.updateTodoDetails(todoID,$scope)){

				// display message
				toastr.success("Updated successfully");

				// redirect to login
				$location.path('/viewTodo/'+todoID);
			}else{
				// display message
				toastr.error('Failed to store details', 'Error');
			}
		}
	};
});