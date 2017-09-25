// edit controller
(function() {
    
	'use strict';
	
	angular.module("dashboard").controller('editController',function($state,$scope,toastr,$location,editService,$sessionStorage){

		// edit form submit
		$scope.editSubmit = function() {

			// check if form invalid
			if($scope.editForm.$valid){

				// post data
				var postData = {
					"first_name" : $scope.first_name,
					"last_name" : $scope.last_name,
					"gender" : $scope.gender,
					"address" : $scope.address,
					"filepreview" : $scope.filepreview
				};

				// check if user details stored
				if(editService.updateUserDetails(postData)){
					// display message
					toastr.success("Details updated successfully");

					// redirect to home
					$state.go('home');
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

})();