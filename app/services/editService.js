// registration service
app.factory('editService',function($localStorage,md5,$sessionStorage){
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
		getUserDetails : function(userEmail){
			// set user data if not set
			this.setUserData();

			var allUserData = $localStorage.userData;
			var userDetails;

			// filter all users
			allUserData.filter(function(data){
				// check user email
				if(data.email == userEmail){
					userDetails = {
							'first_name': data.first_name,
							'last_name': data.last_name,				
							'gender': data.gender,				
							'address': data.address,				
							'filepreview': data.image,				
						};
				}
			});

			return userDetails;
		},

		// update user details
		updateUserDetails : function(userData){
			// change for session
			$localStorage.first_name = userData.first_name;
			$localStorage.last_name = userData.last_name;

			// changes for users data
			var allUserData = $localStorage.userData;
			var updateFlag = 0;
			var userID = $sessionStorage.userID

			// filter all users
			allUserData.filter(function(data){
				// check user email
				if(data.id == userID){
					// update
					data.first_name = userData.first_name;
					data.last_name = userData.last_name;
					data.gender = userData.gender;
					data.address = userData.address;
					data.filepreview = userData.filepreview;

					// change update flag
					updateFlag = 1;
				}
			});

			// check update flag
			if(updateFlag == 1){
				return true;
			}
			return false;
		}
	}
});