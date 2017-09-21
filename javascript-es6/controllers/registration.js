class Registration{

	// constructor
	constructor(firstName,lastName,email,password,confirmPassword){
		 // console log
	    console.log("Current User Email = "+sessionStorage.getItem('email'));
	    console.log("Users = "+JSON.stringify(users));
	    console.log("Teacher Students = "+JSON.stringify(teacherStudent));
	}

	// validate registration form
	validateForm(event){
		event.preventDefault();

	    // get input values
	    this.firstName = document.getElementById("first_name").value;
	    this.lastName = document.getElementById("last_name").value;
	    this.email = document.getElementById("email").value;
	    this.password = document.getElementById("password").value;
	    this.confirmPassword = document.getElementById("confirm_password").value;

	    // check password validation
	    this.firstNameValidation(this.firstName);
	    this.lastNameValidation(this.lastName);
	    this.passwordValidation(this.password,6);
	    this.confirmPasswordValidation(this.confirmPassword,this.password);
	    this.emailValidation(this.email);

	}

	// password validation
	passwordValidation(password,min){
		var passwordLength = password.length;
		if(passwordLength == 0 ||passwordLength < min){ 

			// error message 
			document.getElementById('password-error').style.display = 'block';
			document.getElementById('password-error').innerHTML = "Password should not be empty / less than "+min;

			// focus
			document.getElementById("password").focus();  
			return false;  
		}else{
			// error message 
			document.getElementById('password-error').style.display = 'none';
			document.getElementById('password-error').innerHTML = "";
			return true; 
		}  
	}

	// password validation
	confirmPasswordValidation(confirmPassword,password){
		var passwordLength = password.length;
		if(passwordLength != 0  && confirmPassword != password){ 

			// error message 
			document.getElementById('confirm_password-error').style.display = 'block';
			document.getElementById('confirm_password-error').innerHTML = "Password must be equal";

			// focus
			document.getElementById("confirm_password").focus();  
			return false;  
		}else{
			// error message 
			document.getElementById('confirm_password-error').style.display = 'none';
			document.getElementById('confirm_password-error').innerHTML = "";
			return true; 
		}  
	}

	// first name validation
	firstNameValidation(name){
		var letters = /^[A-Za-z]+$/; 
		if(!name.match(letters)){  

			// error message 
			document.getElementById('first_name-error').style.display = 'block';
			document.getElementById('first_name-error').innerHTML = "Must have alphabet characters only";
			return false;  
		}else{
			// error message 
			document.getElementById('first_name-error').style.display = 'none';
			document.getElementById('first_name-error').innerHTML = "";
			return true; 
		}   
	}

	// last name validation
	lastNameValidation(name){
		var letters = /^[A-Za-z]+$/; 
		if(!name.match(letters)){  

			// error message 
			document.getElementById('last_name-error').style.display = 'block';
			document.getElementById('last_name-error').innerHTML = "Must have alphabet characters only";
			return false;  
		}else{

			// error message 
			document.getElementById('last_name-error').style.display = 'none';
			document.getElementById('last_name-error').innerHTML = "";
			return true; 
		}
	}

	// email validation
	emailValidation(email){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

		if(!email.match(pattern)){  

			// error message 
			document.getElementById('email-error').style.display = 'block';
			document.getElementById('email-error').innerHTML = "Invalid email address";
			return false;  
		}else{

			// error message 
			document.getElementById('email-error').style.display = 'none';
			document.getElementById('email-error').innerHTML = "";
			return true; 
		}
	}
}

// class object
const registrationClass = new Registration();


