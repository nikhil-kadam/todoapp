// registration controller
app.controller('editController',function($scope,toastr,$location,editService,$sessionStorage){

	// edit form submit
	$scope.editSubmit = function($event) {
		$event.preventDefault();

		// check if form invalid
		if($scope.editForm.$invalid){

			// set submitted true
			$scope.editForm.$submitted = true;

			// display message
			toastr.error('Please fill up required details', 'Error');
			
		}else{

			// check if user details stored
			if(editService.updateUserDetails($scope)){
				// display message
				toastr.success("Details updated successfully");

				// redirect to login
				$location.path('/home');
			}else{
				// display message
				toastr.error('Failed to update details', 'Error');
			}
		}
	};

	// fetch user's edit details
	$scope.fetchEditUserDetails = function() { 
		var userEmail = $sessionStorage.email;

		// fetch user details
		var userDetails = editService.getUserDetails(userEmail);

		// set values to input
		if(userDetails != ''){
			$scope.first_name = userDetails.first_name;
			$scope.last_name = userDetails.last_name;
			$scope.gender = userDetails.gender; 
			$scope.address = userDetails.address;
			$scope.filepreview = userDetails.filepreview;
		}
	}; 

	// load user details to inputs
	$scope.fetchEditUserDetails();

});