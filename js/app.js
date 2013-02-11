'use strict';
angular.module('jenkins-notifier', [], function($provide) {
	$provide.factory('jenkins', ['options', '$http', function(options, $http) {
		var j = new Jenkins(options, $http);
		
		return j;					
	}]);
	
	$provide.factory('options', function(){
		var o =  new Options();
		return o;
	});
});
