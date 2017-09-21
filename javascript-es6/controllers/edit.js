
class Edit extends Main{

	// constructor
	constructor(firstName,lastName,email){
		// extend parent class
    	super();

    	// display user details
		this.getUserDetails();

		// check user logged in
        this.isLoggedIn();

         // console log
	    console.log("Current User Email = "+sessionStorage.getItem('email'));
	    console.log("Users = "+JSON.stringify(users));
	    console.log("Teacher Students = "+JSON.stringify(teacherStudent));
	}

	// fetch user details by email
	getUserDetails() {
		// get teacher session email
		var email = sessionStorage.getItem('email');
		var userType = sessionStorage.getItem('userType');

		// search user details
		users.filter(function(data){

			// check user email,password,userType
			if(data.email === email && data.userType == userType){
				document.getElementById("first_name").value = data.first_name;
				document.getElementById("last_name").value = data.last_name;
				document.getElementById("email").value = data.email;
			}
		});
	}

	// validate form
	validateForm(event){
		event.preventDefault();

	    // get input values
	    this.firstName = document.getElementById("first_name").value;
	    this.lastName = document.getElementById("last_name").value;
	    this.email = document.getElementById("email").value;

	    // check password validation
	    var isFirstName = this.firstNameValidation(this.firstName);
	    var isLastName = this.lastNameValidation(this.lastName);
	    var isEmail = this.emailValidation(this.email);

	    var firstName = this.firstName;
	    var lastName = this.lastName;
	    var email = this.email;
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
	list(){
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
	logout(){
		// Remove email address
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('userType');
		window.location = "./login.html";
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
const editClass = new Edit();




