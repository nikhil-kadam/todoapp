// home controller
app.controller('homeController',function($scope,toastr,$location,editService,$sessionStorage,todoService){

	// fetch todo listing
	$scope.fetchTodoList = function(){
		$scope.list_items = todoService.getTodoDetails();
	};

	// diplay listing
	$scope.fetchTodoList();	

	// redirect to todo
	$scope.createTodo = function(){
		$location.path("/todo");
	};

	$scope.tableSelection = {};
  	$scope.isAll = false;
	$scope.selectAllRows = function() { 
	    //check if all selected or not
	    if ($scope.isAll === false) { 
	      //set all row selected
	      angular.forEach($scope.list_items, function(row, index) { 
	        $scope.tableSelection[index] = false;
	      });
	      $scope.isAll = false;
	    } else { 
	      //set all row unselected
	      angular.forEach($scope.list_items, function(row, index) {
	        $scope.tableSelection[index] = true;
	      });
	      $scope.isAll = true;
	    }
	};

	// remove selected
	$scope.removeSelectedRows = function() {
		var confirmed = confirm("Do you want to delete?");

		if(confirmed == true){
		    for (var i = $scope.list_items.length - 1; i >= 0; i--) {
		      if($scope.tableSelection[i]) {

		      	// todo id
		        var todoID = $scope.list_items[i].id;

		        // delete todo item
		        todoService.removeTodoDetails(todoID);

		        //delete row from data
		        $scope.list_items.splice(i, 1);

		        //delete rowSelection property
		        delete $scope.tableSelection[i];
		      }
		    }
		}
	};

	// edit profile
	$scope.editTodo = function(todoID){
		$location.path("/editTodo/"+todoID);
	};

	// view todo
	$scope.viewTodo = function(todoID){
		$location.path("/viewTodo/"+todoID);
	};

	// sorting for table
	$scope.propertyName = 'age';
	$scope.reverse = true;
	
	$scope.sortBy = function(propertyName) {
	   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	   $scope.propertyName = propertyName;
	};
});