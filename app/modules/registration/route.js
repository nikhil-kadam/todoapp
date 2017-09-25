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
