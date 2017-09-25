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