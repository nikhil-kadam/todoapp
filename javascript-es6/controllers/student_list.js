
class Student extends Main {

  // constructor
  constructor(){
    // extend parent class
    super();

    // load display student list function
    this.displayJsonData();

    // check user logged in
    this.isLoggedIn();

    // console log
    console.log("Current User Email = "+sessionStorage.getItem('email'));
    console.log("Users = "+JSON.stringify(users));
    console.log("Teacher Students = "+JSON.stringify(teacherStudent));
  }

  // display student listing
  displayJsonData() {
    var details = '';
    var indexData = 0;
    var x;
    for(x in teacherStudent){

      // get teacher session email
      var email = sessionStorage.getItem('email');

      //check student is assigned to email address
      if(teacherStudent[x].teacherEmail == email){

        // fetch student details
          var studentEmail = teacherStudent[x].email;

        // search teacher details
          users.filter(function(item){
            if(item.email == studentEmail && item.userType == 1){
              // display student details
              details += "<tr>";
              details += "<td>" + item.first_name + "</td>";
              details += "<td>" + item.last_name + "</td>";
              details += "<td>" + item.email + "</td>";
              details += '<td><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="studentClass.removeStudent('+indexData+')"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>';
              details += "</tr>";
            }
          });

        
      }
      indexData++;
    }

    // insert data into table body
    document.getElementById("table_body").innerHTML = details;
  }

  // logout current session
  logout(){
    // Remove email address
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userType');
    window.location = "./login.html";
  }

  // remove student
  removeStudent(indexData) {
    if(confirm("Do you want to remove student")){
      // if delete
      teacherStudent.splice(indexData, 1);
      this.displayJsonData();

      // console
      console.log("Removed Teacher Students = "+JSON.stringify(teacherStudent));
    }
  }

  addStudent(){
    // get teacher session email
    var email = sessionStorage.getItem('email');

    var studentDetails = document.getElementById("studentNames").value;

    if(studentDetails){
      var studentDetailsArray = studentDetails.split("#");
      teacherStudent.push({"email":studentDetailsArray[2],"teacherEmail":email});

      // refresh list view
      this.displayJsonData();

      // console
      console.log("Added Teacher Students = "+JSON.stringify(teacherStudent));

      // close modal
      $("#studentAddModal").modal("toggle");
    }else{
      document.getElementById("studentNames-error").innerHTML = 'Please select student';
      document.getElementById("studentNames-error").style.display = 'block';
    }
  }

  // open modal
  openModal(){

    var remainingUser = [];

    // erase modal error details
    document.getElementById("studentNames-error").innerHTML = '';
    document.getElementById("studentNames-error").style.display = 'none';

    // get teacher session email
    var email = sessionStorage.getItem('email');

    users.filter(function(value){
        var flag = 1;

        // search assigned students
        teacherStudent.filter(function(data){
          if(value.email == data.email && email == data.teacherEmail){
            flag = 0;
          }
        });

        // if user not exist & user type is student
        if(flag == 1 && value.userType == 1){
          remainingUser.push({"first_name":value.first_name,"last_name":value.last_name,"email":value.email});
        }
        
      });

    // add data to drop options
    var options = '';
    var user;
    for(user in remainingUser) {
      options += "<option value="+remainingUser[user].first_name+"#"+remainingUser[user].last_name+"#"+remainingUser[user].email+">"+remainingUser[user].first_name+" "+remainingUser[user].last_name+"</option>";
    }

    // add data to select input
    document.getElementById("studentNames").innerHTML = options;

    // show modal
    $("#studentAddModal").modal("show");
  }
}

// class object
const studentClass = new Student();








