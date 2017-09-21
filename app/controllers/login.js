// login controller
app.controller('loginController',function($scope,loginService,registrationService,toastr,$location,$sessionStorage){

	// login form submit
	$scope.formSubmit = function($event) {	
		$event.preventDefault();	

		// check if form invalid
		if($scope.loginForm.$invalid){

			// set submitted true
			$scope.loginForm.$submitted=true;

			// display message
			toastr.error('Please enter valid email/password', 'Error');

		}else{
			// check user credentials
			if(loginService.checkUserDetails($scope)){

				// display message
				toastr.success("login successfully");

				// redirect to login
				$location.path('/home');
			}else{
				// display message
				toastr.error('Please enter valid email/password', 'Error');	
			}			
		}
	};
});