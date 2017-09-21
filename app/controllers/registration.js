// registration controller
app.controller('registrationController',function($scope,toastr,$location,registrationService){ 
	// register form submit
	$scope.formSubmit = function($event) {
		$event.preventDefault();

		// check if form invalid
		if($scope.registrationForm.$invalid){
			// set submitted true
			$scope.registrationForm.$submitted = true;

			// display message
			toastr.error('Please fill up required details', 'Error');
			
		}else{

			// check if user details stored
			if(registrationService.storeUserDetails($scope)){
				// display message
				toastr.success("Registered successfully");

				// redirect to login
				$location.path('/login');
			}else{
				// display message
				toastr.error('Failed to store details', 'Error');
			}
		}
	};
});