
var Edit = function() {

	// fetch user details by email
	this.getUserDetails = function() {
		// get teacher session email
		var emails = sessionStorage.getItem('email');
		var userType = sessionStorage.getItem('userType');

		// search user details
		users.filter(function(data){

			// check user email,password,userType
			if(data.email === emails && data.userType == userType){

				// read inputs
				var firstName = document.getElementById("first_name");
				var lastName = document.getElementById("last_name");
				var email = document.getElementById("email");

				// set inputs 
				firstName.value = data.first_name;
				lastName.value = data.last_name;
				email.value = data.email;
			}
		});
	}

	// display user details
	this.getUserDetails();

	// console log
    console.log("Current User Email = "+sessionStorage.getItem('email'));
    console.log("Users = "+JSON.stringify(users));
    console.log("Teacher Students = "+JSON.stringify(teacherStudent));

	// validate form
	this.validateForm = function(event){
		event.preventDefault();

	    // get input values
	    var firstName = document.getElementById("first_name").value;
	    var lastName = document.getElementById("last_name").value;
	    var email = document.getElementById("email").value;

	    // check password validation
	    var isFirstName = this.firstNameValidation(firstName);
	    var isLastName = this.lastNameValidation(lastName);
	    var isEmail = this.emailValidation(email);

	    if(isFirstName && isLastName && isEmail){
	    	users.filter(function(data){
	    		if(data.email == email){
	    			data.first_name = firstName;
	    			data.last_name = lastName;
	    			data.email = email;
	    		}
	    	});

	    	alert("Details edited successfully, please check console log");

	    	// check changed details
	    	console.log(JSON.stringify(users));
	    }
	}

	// check user type for listing
	this.list = function(){
		var userType = sessionStorage.getItem('userType');

		if(userType == 2){

			// redirect to student list
			window.location = "./student_list.html";
		}else{

			// redirect to teacher list
			window.location = "./teacher_list.html";
		}
	}

	// logout current session
	this.logout = function(){
		// Remove email address
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('userType');
		window.location = "./login.html";
	}

	// first name validation
	this.firstNameValidation = function(name){
		var letters = /^[A-Za-z]+$/; 

		// error message
		var firstNameErrorLabel = document.getElementById('first_name-error');

		if(!name.match(letters)){  

			// set value
			firstNameErrorLabel.style.display = 'block';
			firstNameErrorLabel.innerHTML = "Must have alphabet characters only";

			return false;  
		}else{
			// error message 
			firstNameErrorLabel.style.display = 'none';
			firstNameErrorLabel.innerHTML = "";
			return true; 
		}   
	}

	// last name validation
	this.lastNameValidation = function(name){
		var letters = /^[A-Za-z]+$/; 

		// read error label
		var lastNameErrorLabel = document.getElementById('last_name-error');

		if(!name.match(letters)){  

			// error message 
			lastNameErrorLabel.style.display = 'block';
			lastNameErrorLabel.innerHTML = "Must have alphabet characters only";
			return false;  
		}else{

			// error message 
			lastNameErrorLabel.style.display = 'none';
			lastNameErrorLabel.innerHTML = "";
			return true; 
		}
	}

	// email validation
	this.emailValidation = function(email){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

		// read error label
		var emailErrorLabel = document.getElementById('email-error');

		if(!email.match(pattern)){  

			// error message 
			emailErrorLabel.style.display = 'block';
			emailErrorLabel.innerHTML = "Invalid email address";
			return false;  
		}else{

			// error message 
			emailErrorLabel.style.display = 'none';
			emailErrorLabel.innerHTML = "";
			return true; 
		}
	}
}

// class object
const editClass = new Edit();




