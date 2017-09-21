
class Teacher extends Main {

    // constructor
    constructor() {
        // extend parent class
        super();

        // display details
        this.displayJsonData();

        // check user logged in
        this.isLoggedIn();

         // console log
        console.log("Current User Email = "+sessionStorage.getItem('email'));
        console.log("Users = "+JSON.stringify(users));
        console.log("Teacher Students = "+JSON.stringify(teacherStudent));
    }

    // display json data in table
    displayJsonData(){

        // get student session email
        var email = sessionStorage.getItem('email');    

        // check student assigned to teachers
        var teacherList = [];
        teacherStudent.filter(function(data){
            if(data.email == email){
                var teacherEmail = data.teacherEmail;

                // search teacher details
                users.filter(function(item){
                    if(item.email == teacherEmail && item.userType == 2){
                        teacherList.push({"first_name":item.first_name,"last_name":item.last_name,"email":item.email});
                    }
                });
            }
        })
        
        // display list in table structure    
        var details = '';
        var x;
        for(x in teacherList){
            details += "<tr>";
            details += "<td>" + teacherList[x].first_name + "</td>";
            details += "<td>" + teacherList[x].last_name + "</td>";
            details += "<td>" + teacherList[x].email + "</td>";
            details += "</tr>";
        }

        document.getElementById("table_body").innerHTML = details;
    }

    // logout current session
    logout(){
        // Remove email address
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');
        window.location = "./login.html";
    }
}

// class object
const teacherClass = new Teacher();

