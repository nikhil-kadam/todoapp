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
    