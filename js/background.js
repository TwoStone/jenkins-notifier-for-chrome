/**
 * Background JavaScript
 */
function backgroundControl($scope, log, jenkins, storage, $timeout) {
	var promise;
	
	$scope.onInit = function() {
		checkServer();
		storage.onUpdate('options', function() {
			if (promise) {
				promise.cancel();
				checkServer();
			}
		});
	}
	
	var scheduleCheck = function() {
		storage.get('options', function(opt) {
			promise = $timeout(checkServer, opt.interval * 1000);
			scheduleCheck(opt);
            
		});
	}
	
	var checkServer = function() {
		log.debug("Checking Server");
	}
} 
