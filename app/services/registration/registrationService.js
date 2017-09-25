// registration service
(function() {
	
	'use strict',

	angular.module('registration').factory('registrationService',function($localStorage,md5){

		// variable to get user details
		var userDetails = [];

		// functions
		return {

			// set local storage 
			setUserData : function(){
				// store object in local storage
				if(typeof $localStorage.userData === 'undefined'){
					$localStorage.userData = userDetails;
				}
			},

			// get user details
			getUserDetails : function(){
				// set user data if not set
				this.setUserData();

				// return all details
				return $localStorage.userData;
			},

			// store user details
			storeUserDetails : function(userData){
				
				// get user details 
				userDetails = this.getUserDetails();

				// add unique id for field
				var lastObject;
				if(userDetails.length != 0){
					var lastElement = userDetails.length - 1;
					lastObject = userDetails[lastElement].id + 1;
				}else{
					lastObject = 1;
				}
				

				// push details
				userDetails.push({
					'id': lastObject,
					'first_name':userData.first_name,
					'last_name':userData.last_name,
					'gender':userData.gender,
					'email':userData.email,
					'password':md5.createHash(userData.password),
					'address':userData.address,
					'image': userData.filepreview
				});

				// store object in local storage
				$localStorage.userData = userDetails;

				// check if data inserted
				if($localStorage.userData != ''){
					return true;
				}
				return false;
			}
		}
	});
})();