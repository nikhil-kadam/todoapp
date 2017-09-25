// login service
(function() {
	
	'use strict',

	angular.module("login").factory('loginService',function($localStorage,md5,$sessionStorage){	

		// functions
		return {

			// check user details
			checkUserDetails : function(userCredentials){

				var isValidUser = 0; 

				// variable to get user details
				var userDetails = $localStorage.userData;
				var email = userCredentials.email;
				var password = md5.createHash(userCredentials.password);
				var firstName;
				var lastName;
				var userID;

				if(typeof userDetails !== 'undefined'){
					// check user details
					userDetails.filter(function(data){
						if(data.email == email && data.password == password){
							isValidUser = 1;

							// set user details
							firstName = data.first_name;
							lastName = data.Last_name;
							userID = data.id;
						}				
					});

					// check if user is valid
					if(isValidUser == 1){
						// set user session details
						$sessionStorage.email = email;
						$sessionStorage.firstName = firstName;
						$sessionStorage.lastName = lastName;
						$sessionStorage.userID = userID;

						return true;
					}
				}
				return false;
			},

			// check user is loggedin
			isLoggedIn : function(){
				if(typeof $sessionStorage.email !== 'undefined'){ 
					return true;
				}else{
					return false;
				}
			}
		}
	});
})();