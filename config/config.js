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