
// when back pressed redirect to main page
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});


class Login{

	// constructor
	constructor(email,password,userType){
		
		// check if user logged in
		if(this.isLoggedIn()){
			if(sessionStorage.getItem('userType') == 1){
				// redirect to student list
		    	window.location = "./student_list.html";
			}else{
				// redirect to teacher list
		    	window.location = "./teacher_list.html";
			}
		}

		 // console log
	    console.log("Current User Email = "+sessionStorage.getItem('email'));
	    console.log("Users = "+JSON.stringify(users));
	    console.log("Teacher Students = "+JSON.stringify(teacherStudent));
	}

	// check user logged in
	isLoggedIn(){
		// get email details
		var email = sessionStorage.getItem('email');
		if(email){
			return true;
		}
		return false;
	}

	// validate form
	validateForm(event){
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
	checkLoginDetails(email,password,userType){
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
	createSession(email,userType){
		// Save data to sessionStorage
		sessionStorage.setItem('email', email);
		sessionStorage.setItem('userType', userType);
	}

	// validation for password
	passwordValidation(password,min){
		let passwordLength = password.length;
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

	// confirm password validation
	confirmPasswordValidation(confirmPassword,password){
		let passwordLength = password.length;
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

const loginClass = new Login();


