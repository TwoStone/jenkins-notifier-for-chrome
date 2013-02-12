/**
 * Service for interacting with the chrome storage
 */
var ChromeStorage = function($log) {
	
	var observers = {};
	var storageArea = chrome.storage.local;
	
	this.get = function(key, callback) {
		
		$log.debug("Serving data from storage");
		storageArea.get(key, function(data) {
			$log.debug("Data received " + angular.toJson(data, true));
			callback(data[key]);
		});
	}
	
	this.set = function(key, data) {
		$log.info("Saving new data for " + key);
		var newData = {};
		newData[key] = data; 
		storageArea.set(newData, function() {
			$log.debug("Data saved:" + angular.toJson(data, true));
		});
	}
	
	this.onUpdate = function(key, callback) {
		if (!observers[key]) {
			observers[key] = [];
		}
		observers[key].push(callback);
	}
	
	var notify =  function(key, data) {
		if (observers[key]) {
			angular.forEach(observers[key], function(value) {
				value(key, data);				
			});
		}
	}
	
	chrome.storage.onChanged.addListener(function(changes) {
		angular.forEach(changes, function(value, key) {
			notify(key, value.newValue)
		});
	});
};
