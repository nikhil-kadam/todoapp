let users = [
    {
     "first_name": "Rohan",
     "last_name": "kadam",
     "email": "Rehan@gmail.com",
     "password": "111111",
     "userType": "1"
    },
    {
      "first_name": "ganesh",
      "last_name": "kanase",
      "email": "ganesh@gmail.com",
      "password": "111111",
      "userType": "1"
    },
    {
      "first_name": "sid",
      "last_name": "kanase",
      "email": "sid@gmail.com",
      "password": "111111",
      "userType": "1"
    },
    {
      "first_name": "nikhil",
      "last_name": "kanase",
      "email": "nik@gmail.com",
      "password": "111111",
      "userType": "2"
    },
]; 

let teacherStudent = [
    {
     "email": "Rehan@gmail.com",
     "teacherEmail":"nik@gmail.com"
    },
    {
      "email": "ganesh@gmail.com",
      "teacherEmail":"nikhil@gmail.com"
    },
    {
      "email": "sid@gmail.com",
      "teacherEmail":"nik@gmail.com"
    },
]; 

// class
class Main{

  //constructor
  constructor(){
    
  }

  // check user logged in
  isLoggedIn(){
    // get email details
    var email = sessionStorage.getItem('email');
    if(email){
      return true;
    }
    window.location = "./login.html";
  }
}

// object
const mainClass = new Main();