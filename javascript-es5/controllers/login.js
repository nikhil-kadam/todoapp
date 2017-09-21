
// when back pressed redirect to main page
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});


var Login = function(){ 
	
	// variables
	var email,password,userType; 
    
    // check user logged in
    this.isLoggedIn = function(){
    	// get email details
		var email = sessionStorage.getItem('email');
		if(email){
			return true;
		}
		return false;
    }

    this.validateForm = function(event){
    	event.preventDefault();

	    // get input values
	    this.email = document.getElementById("email").value;
	    this.password = document.getElementById("password").value;
	    this.userType = document.getElementById("user_type").value;

	    // check password validation
	    var isPassword = this.passwordValidation(this.password,6);
	    var isEmail = this.emailValidation(this.email);
	    if(isPassword != false && isEmail != false){

	    	// check user credentials
	    	if(this.checkLoginDetails(this.email,this.password,this.userType)){

		    	// check user type
		    	if(this.userType == 2){

		    		// set session
		    		this.createSession(this.email,this.userType);

		    		// redirect to student list
		    		window.location = "./student_list.html";
		    	}else{

		    		// set session
		    		this.createSession(this.email,this.userType);

		    		// redirect to teacher list
		    		window.location = "./teacher_list.html";
		    	}
		    }else{
		    	document.getElementById("fail_message").style.display = 'block';
		    }
	    }
    }

    // check user details
    this.checkLoginDetails = function(email,password,userType){
    	var isCredentialsMatched = 0;
		users.filter(function(data){

			// check user email,password,userType
			if(data.email === email && data.password === password && data.userType === userType){
				isCredentialsMatched = 1;
			}
		});

		// if user details found
		if(isCredentialsMatched == 1){
			return true;
		}
		return false;
    }

    // create session
    this.createSession = function(email,userType){
    	// Save data to sessionStorage
		sessionStorage.setItem('email', email);
		sessionStorage.setItem('userType', userType);
    }

    // validation for password
    this.passwordValidation = function(password,min){
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

    // confirm password validation
    this.confirmPasswordValidation = function(confirmPassword,password){
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
    this.firstNameValidation = function(name){
    	var letters = /^[A-Za-z]+$/; 

    	// read error input
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

var loginClass = new Login();



