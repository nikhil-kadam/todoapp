// registration service
app.factory('todoService',function($localStorage,md5,$sessionStorage){
	// variable to get todo details
	var todoDetails = [];

	// functions
	return {

		// set local storage 
		setTodoData : function(){
			// store object in local storage
			if(typeof $localStorage.todoDetails === 'undefined'){
				$localStorage.todoDetails = todoDetails;
			}
		},

		// get user details
		getTodoDetails : function(userEmail){
			// set user data if not set
			this.setTodoData();

			var allTodoData = $localStorage.todoDetails;
			var userDetails;

			// filter all users
			allTodoData.filter(function(data){
				// check user email
				if(data.email == userEmail){
					userDetails = {
							'first_name': data.first_name,
							'last_name': data.last_name,
							'email': data.email							
						};
				}
			});

			return userDetails;
		},

		// store todo details
		storeTodoDetails : function(userData){
			// set user data if not set
			this.setTodoData();

			// todo data
			var allUserData = $localStorage.todoDetails;

			// add unique id for field
			var lastObject;
			if(allUserData.length != 0){
				var lastElement = allUserData.length - 1;
				lastObject = allUserData[lastElement].id + 1;
			}else{
				lastObject = 1;
			}
			
			// store todo details into array
			allUserData.push({
				'id': lastObject,
				'name': userData.name,
				'todoDate': userData.todoDate,
				'isReminder': userData.isReminder,
				'reminderDate': userData.reminderDate,
				'isPublic': userData.isPublic,
				'image':userData.filepreview,
				'status':'0',
				'userID': $sessionStorage.userID,
				'categories':{
					'office': userData.officeCategory,
					'training': userData.trainingcategory,
				}
			});

			console.log(JSON.stringify(allUserData));

			return true;
		},

		// fetch all todo details
		getTodoDetails : function(){
			// set user data if not set
			this.setTodoData();

			var allTodoData = $localStorage.todoDetails;
			var userID = $sessionStorage.userID;
			var filteredTodoList = [];

			// filter all users
			allTodoData.filter(function(data){
				// check user email
				if(data.userID == userID){
					filteredTodoList.push(data);
				}
			});

			return filteredTodoList;
		},

		// remove from todo
		removeTodoDetails : function(todoID){
			var allTodoList = this.getTodoDetails();
	    
			// filter all todo items
			var index = 0;
		    allTodoList.filter(function(data){
		      if(todoID == data.id) { 

		        //delete row from data
		        allTodoList.splice(index, 1);
		      }
		      index++;
		    });

		    // set new todo details
		    $localStorage.todoDetails = allTodoList;
		},

		// fecth todo details
		fetchTodoDetails : function(todoID){
			var allTodoList = this.getTodoDetails();
			var todoDetails;
		    allTodoList.filter(function(data){
		      if(todoID == data.id) { 

		        todoDetails = data;
		      }
		    });
		    return todoDetails;
		},

		// update todo details
		updateTodoDetails : function(todoID,userData) {

			var allTodoData = $localStorage.todoDetails;
			var userID = $sessionStorage.userID;
			var filteredTodoList = [];

			// filter all users
			allTodoData.filter(function(data){

				// check user email
				if(data.userID == userID && todoID == data.id){
					// set values
					data.name = userData.name;
					data.categories = {
						'office': userData.officeCategory,
						'training': userData.trainingcategory,
					};
					data.todoDate = userData.todoDate;
					data.isReminder = userData.isReminder;
					data.reminderDate = userData.reminderDate;
					data.isPublic = userData.isPublic;
					data.image = userData.filepreview;
					data.status = userData.status;
				}
			});

		    return true;
		}
	}
});