// login controller
(function() {

	'use strict',

	angular.module("login").controller('loginController',function($state,$scope,loginService,registrationService,toastr,$location,$sessionStorage){

		// login form submit
		$scope.formSubmit = function() {	

			// check if form invalid
			if($scope.loginForm.$valid){

				// post details
				var postData = {
					"email" : $scope.email,
					"password" : $scope.password
				};

				// check user credentials
				if(loginService.checkUserDetails(postData)){
					
					// display message
					toastr.success("login successfully");

					// redirect to login
					$state.go('home');
				}else{
					// display message
					toastr.error('Please enter valid email/password', 'Error');	
				}

			}
		};
	});

})();