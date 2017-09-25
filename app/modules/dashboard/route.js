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
    