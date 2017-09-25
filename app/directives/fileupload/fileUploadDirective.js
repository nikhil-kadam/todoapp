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