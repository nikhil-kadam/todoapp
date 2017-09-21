// try to use IIFE
var Registration = (function(){

	// console log
    console.log("Current User Email = "+sessionStorage.getItem('email'));
    console.log("Users = "+JSON.stringify(users));
    console.log("Teacher Students = "+JSON.stringify(teacherStudent));

	// validate registration form
	var validateForm = function(event){
		event.preventDefault();

	    // get input values
	    this.firstName = document.getElementById("first_name").value;
	    this.lastName = document.getElementById("last_name").value;
	    this.email = document.getElementById("email").value;
	    this.password = document.getElementById("password").value;
	    this.confirmPassword = document.getElementById("confirm_password").value;

	    // check password validation
	    firstNameValidation(this.firstName);
	    lastNameValidation(this.lastName);
	    passwordValidation(this.password,6);
	    confirmPasswordValidation(this.confirmPassword,this.password);
	    emailValidation(this.email);

	}

	// password validation
	var passwordValidation = function(password,min){
		var passwordLength = password.length;

		// read inputs
		var passwordErrorLabel = document.getElementById('password-error');
		if(passwordLength == 0 ||passwordLength < min){ 

			// error message 
			passwordErrorLabel.style.display = 'block';
			passwordErrorLabel.innerHTML = "Password should not be empty / less than "+min;

			// focus
			document.getElementById("password").focus();  
			return false;  
		}else{

			// error message 
			passwordErrorLabel.style.display = 'none';
			passwordErrorLabel.innerHTML = "";
			return true; 
		}  
	}

	// password validation
	var confirmPasswordValidation = function(confirmPassword,password){
		var passwordLength = password.length;

		// read error label
		var confirmPasswordErrorLabel = document.getElementById('confirm_password-error');
		if(passwordLength != 0  && confirmPassword != password){ 

			// error message 
			confirmPasswordErrorLabel.style.display = 'block';
			confirmPasswordErrorLabel.innerHTML = "Password must be equal";

			// focus
			document.getElementById("confirm_password").focus();  
			return false;  
		}else{
			// error message 
			confirmPasswordErrorLabel.style.display = 'none';
			confirmPasswordErrorLabel.innerHTML = "";
			return true; 
		}  
	}

	// first name validation
	var firstNameValidation = function(name){
		var letters = /^[A-Za-z]+$/; 

		// read error inputs
		var firstNameErrorLabel = document.getElementById('first_name-error');
		if(!name.match(letters)){  

			// error message 
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
	var lastNameValidation = function(name){
		var letters = /^[A-Za-z]+$/; 

		// read error inputs
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
	var emailValidation = function(email){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

		// read error inputs
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

	return {
		validateForm : validateForm
	};
})();



