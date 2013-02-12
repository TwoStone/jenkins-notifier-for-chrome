var Jenkins = function(storage, $http, $log) {
	
	var api = "/api/json";
	var options = {};
		
	storage.onUpdate('options', function(){
		$log.info("Options changed");
		loadOptions();
	});
	
	this.getJenkinsInformation = function(callback) {
		var url = options.jenkins_url + api;
		url += "?tree=description";
		$http.get(url).success(function(data) {
			callback.success(data);
		})
		
	};
	
	this.getJobs = function(callback) {
		if (options) {
			var url = options.jenkins_url + api;
			url += "?tree=jobs[name,color,url]"
			$http.get(url).success(function(data) {
				callback.success(data.jobs);
			}).error(function(data)  {
				callback.error(data);
			});
		}
	};
	
	var loadOptions = function() {
		storage.get('options', function(opt) {
			options = opt;
		});
	}
	
	loadOptions();
};
