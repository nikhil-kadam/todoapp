// Registration controller
(function() {
	
	'use strict',

	angular.module('registration').controller('registrationController',function($state,$scope,toastr,$location,registrationService){ 
		// register form submit
		$scope.formSubmit = function() {

			// check if form invalid
			if($scope.registrationForm.$valid){

				// post data
				var postData = {
					"first_name" : $scope.first_name,
					"last_name" : $scope.last_name,
					"gender" : $scope.gender,
					"email" : $scope.email,
					"password" : $scope.password,
					"address" : $scope.address,
					"filepreview" : $scope.filepreview
				};
				
				// check if user details stored
				if(registrationService.storeUserDetails(postData)){
					// display message
					toastr.success("Registered successfully");

					// redirect to login
					$state.go('login');
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}
				
			}
		};
	});

})();