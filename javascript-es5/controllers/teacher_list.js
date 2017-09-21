
var Teacher = function(){
    
    // console log
    console.log("Current User Email = "+sessionStorage.getItem('email'));
    console.log("Users = "+JSON.stringify(users));
    console.log("Teacher Students = "+JSON.stringify(teacherStudent));

    // display json data in table
    this.displayJsonData = function(){

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

        var tableBody = document.getElementById("table_body");
        tableBody.innerHTML = details;
    }

    // display details
    this.displayJsonData();

    // logout current session
    this.logout = function(){
        // Remove email address
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');
        window.location = "./login.html";
    }
}

// class object
const teacherClass = new Teacher();

