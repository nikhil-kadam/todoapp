// local environment
(function() {
	
	'use strict';

	angular.module('config', []).provider('configProvider', [configProvider]);

	function configProvider() {
		var environment = {
			
		};

		this.$get = function() {
			return environment;
		}
	}

})();
// config file
(function() {
    
    'use strict';

    // app
    angular.module('Todo',[
        'ui.router',
        'config',
        'registration',
        'login',
        'dashboard',
        'todos'
    ])
    .config(function($locationProvider,toastrConfig,$stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        // toastr config
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            timeOut: 2000
        });
    })
    .run(function($state,$rootScope,loginService){
        // check login
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var authToken = loginService.isLoggedIn();
            if (!authToken && toState.name !== 'login' && toState.name !== 'registration') {
                event.preventDefault();
                $state.go('login');    
            } 
        })       
    })

})();
// Registration module route
(function(){

    'use strict'

    angular
        .module('registration',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router'])
        .config(['$stateProvider', stateProvider]);

    function stateProvider($stateProvider) {

        $stateProvider
            .state('registration', {
                url: '/registration',
                templateUrl: 'app/modules/registration/views/registration.html',
                controller: "registrationController"
            });
    }
    
})();

// Registration controller
(function() {
	
	'use strict',

	angular.module('registration').controller('registrationController',function($state,$scope,toastr,$location,registrationService){ 
		// register form submit
		$scope.formSubmit = function() {

			// check if form invalid
			if($scope.registrationForm.$valid){

				// post data
				var postData = {
					"first_name" : $scope.first_name,
					"last_name" : $scope.last_name,
					"gender" : $scope.gender,
					"email" : $scope.email,
					"password" : $scope.password,
					"address" : $scope.address,
					"filepreview" : $scope.filepreview
				};
				
				// check if user details stored
				if(registrationService.storeUserDetails(postData)){
					// display message
					toastr.success("Registered successfully");

					// redirect to login
					$state.go('login');
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}
				
			}
		};
	});

})();
// registration service
(function() {
	
	'use strict',

	angular.module('registration').factory('registrationService',function($localStorage,md5){

		// variable to get user details
		var userDetails = [];

		// functions
		return {

			// set local storage 
			setUserData : function(){
				// store object in local storage
				if(typeof $localStorage.userData === 'undefined'){
					$localStorage.userData = userDetails;
				}
			},

			// get user details
			getUserDetails : function(){
				// set user data if not set
				this.setUserData();

				// return all details
				return $localStorage.userData;
			},

			// store user details
			storeUserDetails : function(userData){
				
				// get user details 
				userDetails = this.getUserDetails();

				// add unique id for field
				var lastObject;
				if(userDetails.length != 0){
					var lastElement = userDetails.length - 1;
					lastObject = userDetails[lastElement].id + 1;
				}else{
					lastObject = 1;
				}
				

				// push details
				userDetails.push({
					'id': lastObject,
					'first_name':userData.first_name,
					'last_name':userData.last_name,
					'gender':userData.gender,
					'email':userData.email,
					'password':md5.createHash(userData.password),
					'address':userData.address,
					'image': userData.filepreview
				});

				// store object in local storage
				$localStorage.userData = userDetails;

				// check if data inserted
				if($localStorage.userData != ''){
					return true;
				}
				return false;
			}
		}
	});
})();
// Login module route
(function(){
    
    'use strict'

    angular
        .module('login',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router'])
        .config(['$stateProvider', stateProvider]);

    function stateProvider($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/modules/login/views/login.html',
                controller: "loginController"
            });
    }
    
})();
    
// login controller
(function() {

	'use strict',

	angular.module("login").controller('loginController',function($state,$scope,loginService,registrationService,toastr,$location,$sessionStorage){

		// login form submit
		$scope.formSubmit = function() {	

			// check if form invalid
			if($scope.loginForm.$valid){

				// post details
				var postData = {
					"email" : $scope.email,
					"password" : $scope.password
				};

				// check user credentials
				if(loginService.checkUserDetails(postData)){
					
					// display message
					toastr.success("login successfully");

					// redirect to login
					$state.go('home');
				}else{
					// display message
					toastr.error('Please enter valid email/password', 'Error');	
				}

			}
		};
	});

})();
// login service
(function() {
	
	'use strict',

	angular.module("login").factory('loginService',function($localStorage,md5,$sessionStorage){	

		// functions
		return {

			// check user details
			checkUserDetails : function(userCredentials){

				var isValidUser = 0; 

				// variable to get user details
				var userDetails = $localStorage.userData;
				var email = userCredentials.email;
				var password = md5.createHash(userCredentials.password);
				var firstName;
				var lastName;
				var userID;

				if(typeof userDetails !== 'undefined'){
					// check user details
					userDetails.filter(function(data){
						if(data.email == email && data.password == password){
							isValidUser = 1;

							// set user details
							firstName = data.first_name;
							lastName = data.Last_name;
							userID = data.id;
						}				
					});

					// check if user is valid
					if(isValidUser == 1){
						// set user session details
						$sessionStorage.email = email;
						$sessionStorage.firstName = firstName;
						$sessionStorage.lastName = lastName;
						$sessionStorage.userID = userID;

						return true;
					}
				}
				return false;
			},

			// check user is loggedin
			isLoggedIn : function(){
				if(typeof $sessionStorage.email !== 'undefined'){ 
					return true;
				}else{
					return false;
				}
			}
		}
	});
})();
// Dashboard module route
(function(){
    
    'use strict'

    angular
        .module('dashboard',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router'])
        .config(['$stateProvider', stateProvider]);

    function stateProvider($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/modules/dashboard/views/home.html',
                controller: "homeController"
            })
            .state("edit", {
                url: '/edit',
                templateUrl : "app/modules/dashboard/views/edit.html",
                controller: 'editController'
            })
    }
    
})();
    
// home controller
(function() {
	
	'use strict';

	angular.module("dashboard").controller('homeController',function($state,$scope,toastr,$location,editService,$sessionStorage,todoService){

		// fetch todo listing
		$scope.fetchTodoList = function(){
			$scope.list_items = todoService.getTodoDetails();
		};

		// diplay listing
		$scope.fetchTodoList();	

		$scope.tableSelection = {};
		$scope.isAll = false;
		$scope.selectAllRows = function() { 
				//check if all selected or not
				if ($scope.isAll === false) { 
					//set all row selected
					angular.forEach($scope.list_items, function(row, index) { 
						$scope.tableSelection[index] = false;
					});
					$scope.isAll = false;
				} else { 
					//set all row unselected
					angular.forEach($scope.list_items, function(row, index) {
						$scope.tableSelection[index] = true;
					});
					$scope.isAll = true;
				}
		};

		// remove selected
		$scope.removeSelectedRows = function() {
			var confirmed = confirm("Do you want to delete?");

			if(confirmed == true){
					for (var i = $scope.list_items.length - 1; i >= 0; i--) {
						if($scope.tableSelection[i]) {

							// todo id
							var todoID = $scope.list_items[i].id;

							// delete todo item
							todoService.removeTodoDetails(todoID);

							//delete row from data
							$scope.list_items.splice(i, 1);

							//delete rowSelection property
							delete $scope.tableSelection[i];
						}
					}
			}
		};

		// edit profile
		$scope.editTodo = function(todoID){
			$state.go("editTodo",{"id":todoID});
		};

		// view todo
		$scope.viewTodo = function(todoID){
			$state.go('viewTodo',{"id":todoID});
		};

		// sorting for table
		$scope.propertyName = 'age';
		$scope.reverse = true;		
		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		$scope.filteredTodos = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 10
		,$scope.maxSize = 5;
		
		$scope.makeTodos = function() {
			$scope.todos = [];
			var i;
			for (i=1;i<=1000;i++) {
				$scope.todos.push({ text:'todo '+i, done:false});
			}
		};
		$scope.makeTodos(); 
		
		$scope.$watch('currentPage + numPerPage', function() {
			var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			, end = begin + $scope.numPerPage;
			
			$scope.filteredTodos = $scope.todos.slice(begin, end);
		});

	});

})();
// edit controller
(function() {
    
	'use strict';
	
	angular.module("dashboard").controller('editController',function($state,$scope,toastr,$location,editService,$sessionStorage){

		// edit form submit
		$scope.editSubmit = function() {

			// check if form invalid
			if($scope.editForm.$valid){

				// post data
				var postData = {
					"first_name" : $scope.first_name,
					"last_name" : $scope.last_name,
					"gender" : $scope.gender,
					"address" : $scope.address,
					"filepreview" : $scope.filepreview
				};

				// check if user details stored
				if(editService.updateUserDetails(postData)){
					// display message
					toastr.success("Details updated successfully");

					// redirect to home
					$state.go('home');
				}else{
					// display message
					toastr.error('Failed to update details', 'Error');
				}
				
			}
		};

		// fetch user's edit details
		$scope.fetchEditUserDetails = function() { 
			var userEmail = $sessionStorage.email;

			// fetch user details
			var userDetails = editService.getUserDetails(userEmail);

			// set values to input
			if(userDetails != ''){
				$scope.first_name = userDetails.first_name;
				$scope.last_name = userDetails.last_name;
				$scope.gender = userDetails.gender; 
				$scope.address = userDetails.address;
				$scope.filepreview = userDetails.filepreview;
			}
		}; 
	
		// load user details to inputs
		$scope.fetchEditUserDetails();
	});

})();
// edit service
(function() {
	
	'use strict',

	angular.module("dashboard").factory('editService',function($localStorage,md5,$sessionStorage){
		// variable to get user details
		var userDetails = [];

		// functions
		return {

			// set local storage 
			setUserData : function(){
				// store object in local storage
				if(typeof $localStorage.userData === 'undefined'){
					$localStorage.userData = userDetails;
				}
			},

			// get user details
			getUserDetails : function(userEmail){
				// set user data if not set
				this.setUserData();

				var allUserData = $localStorage.userData;
				var userDetails;

				// filter all users
				allUserData.filter(function(data){
					// check user email
					if(data.email == userEmail){
						userDetails = {
								'first_name': data.first_name,
								'last_name': data.last_name,				
								'gender': data.gender,				
								'address': data.address,				
								'filepreview': data.image,				
							};
					}
				});

				return userDetails;
			},

			// update user details
			updateUserDetails : function(userData){
				// change for session
				$localStorage.first_name = userData.first_name;
				$localStorage.last_name = userData.last_name;

				// changes for users data
				var allUserData = $localStorage.userData;
				var updateFlag = 0;
				var userID = $sessionStorage.userID

				// filter all users
				allUserData.filter(function(data){
					// check user email
					if(data.id == userID){
						// update
						data.first_name = userData.first_name;
						data.last_name = userData.last_name;
						data.gender = userData.gender;
						data.address = userData.address;
						data.filepreview = userData.filepreview;

						// change update flag
						updateFlag = 1;
					}
				});

				// check update flag
				if(updateFlag == 1){
					return true;
				}
				return false;
			}
		}
	});
})();
// Todo module route
(function(){
    
    'use strict'

    angular
        .module('todos',['toastr','ngStorage','angular-md5','720kb.datepicker','ui.router'])
        .config(['$stateProvider', stateProvider]);

    function stateProvider($stateProvider) {

        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'app/modules/todo/views/todo.html',
                controller: "todoController"
            })
            .state("editTodo", {
                url: '/editTodo/:id',
                templateUrl : "app/modules/todo/views/editTodo.html",
                controller: 'todoController'
            })
            .state("viewTodo", {
                url: '/viewTodo/:id',
                templateUrl : "app/modules/todo/views/viewTodo.html",
                controller: 'todoController'
            })
    }
    
})();
    
// todo controller
(function() {
	
	'use strict',

	angular.module("todos").controller('todoController',function($state,$scope,toastr,$location,todoService,$sessionStorage,$stateParams){

		var todoID = $stateParams.id;

		// variable object
		$scope.todosDetails = {
			"name" : "",
			"todoDate" : "",
			"isReminder" : "",
			"reminderDate" : "",
			"isPublic" : "",
			"status" : "",
			"officeCategory" : "",
			"trainingcategory" : ""
		};

		// load todo details
		var init = function(){
			var todoDetails = todoService.fetchTodoDetails(todoID);

			if(typeof todoDetails !== 'undefined'){ 
				// set values
				$scope.todosDetails.name = todoDetails.name;
				$scope.todosDetails.todoDate = todoDetails.todoDate;
				$scope.todosDetails.isReminder = todoDetails.isReminder;
				$scope.todosDetails.reminderDate = todoDetails.reminderDate;
				$scope.todosDetails.isPublic = todoDetails.isPublic;
				$scope.filepreview = todoDetails.image;
				$scope.todosDetails.status = todoDetails.status;
				$scope.todosDetails.officeCategory = todoDetails.categories.office;
				$scope.todosDetails.trainingcategory = todoDetails.categories.training;
			}
		};

		// load init 
		init();

		// create todo
		$scope.createTodo = function(){

			if($scope.todoForm.$valid){

				// post data
				var postData = {
					"name" : $scope.todosDetails.name,
					"todoDate" : $scope.todosDetails.todoDate,
					"isReminder" : $scope.todosDetails.isReminder,
					"reminderDate" : $scope.todosDetails.reminderDate,
					"isPublic" : $scope.todosDetails.isPublic,
					"filepreview" : $scope.filepreview,
					"officeCategory" : $scope.todosDetails.officeCategory,
					"trainingcategory" : $scope.todosDetails.trainingcategory
				};
				
				// check if todo details stored
				if(todoService.storeTodoDetails(postData)){
					
					// display message
					toastr.success("Added successfully");

					// redirect to login
					$state.go('home');
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}
			}
		};

		// edit todo
		$scope.editTodo = function(){

			if($scope.todoForm.$valid){

				// post data
				var postData = {
					"name" : $scope.todosDetails.name,
					"todoDate" : $scope.todosDetails.todoDate,
					"isReminder" : $scope.todosDetails.isReminder,
					"reminderDate" : $scope.todosDetails.reminderDate,
					"isPublic" : $scope.todosDetails.isPublic,
					"status" : $scope.todosDetails.status,
					"filepreview" : $scope.filepreview,
					"officeCategory" : $scope.todosDetails.officeCategory,
					"trainingcategory" : $scope.todosDetails.trainingcategory
				};
				
				// check if todo details stored
				if(todoService.updateTodoDetails(todoID,postData)){

					// display message
					toastr.success("Updated successfully");

					// redirect to login
					$state.go('viewTodo',{"id":todoID});
				}else{
					// display message
					toastr.error('Failed to store details', 'Error');
				}				
			}
		};
	});
})();
// Todo service
(function() {
	
	'use strict',

	angular.module("todos").factory('todoService',function($localStorage,md5,$sessionStorage){
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
})();
// todo filter

(function() {
    
	'use strict';
	
	angular.module("todos").filter("myfilter", function($filter) {
		return function(items, from, to) { 
			var filterData = [];
			items.filter(function(data){
				var mainDate = new Date(data.todoDate).setHours(0, 0, 0, 0);
				var stDate = new Date(from).setHours(0, 0, 0, 0);
				var edDate = new Date(to).setHours(0, 0, 0, 0);

				if(mainDate >= stDate && mainDate <= edDate){
					filterData.push(data); 
				}
			});
			
			if(typeof from !== 'undefined' && typeof to !== 'undefined'){ 
				return filterData;
			}else{
				return items;
			}
		};
	});

})();
// navbar directive

(function() {
    
    'use strict';

    angular.module("Todo").directive('navbarDirective', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/navbar/views/navbar.html',
            link: function(scope, element, attrs) {

            },
            controller: function($scope,$state) {
                // todo list
                $scope.todoList = function(){
                    // redirect to login
                    $state.go('home');
                };

                // logout
                $scope.logout = function(){
                    sessionStorage.clear();
                    $state.go('login');
                };

                // redirect to edit form submit
                $scope.editProfile = function() {
                    $state.go("edit");
                };
            }
        };
    });
})();
// navbar directive
(function() {
    
    'use strict';

    angular.module("Todo").directive('searchDirective', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/search/views/search.html',
            link: function(scope, element, attrs) {

            },
            controller: function($scope,$state) {

                // create todo
                $scope.createTodo = function(){
                    $state.go("todo");
                };
            }
        };
    });
})();
// file upload directive
(function() {
    
    'use strict';

    angular.module("Todo").directive('fileUpload', function () {
        return {
            link: function (scope, element) {

                var fileReader = new FileReader();
                element.bind('change', function (evt) {

                    scope.fileinput = evt.target.files[0];
                    
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) { 
                        scope.$apply(function() {
                        scope.filepreview = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(scope.fileinput);
                });
            }
        };
    });
})();