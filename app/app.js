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
        //alert(loginService.isLoggedIn());
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var authToken = loginService.isLoggedIn();
            if (!authToken && toState.name !== 'login' && toState.name !== 'registration') {
                event.preventDefault();
                $state.go('login');    
            } 
        })       
    })

})();