var Jenkins;

Jenkins = (function() {
	
	var api = "/api/json";
	
	function Jenkins(options, $http) {
		this.$http = $http;
		this.options = options;
	}
	
	Jenkins.prototype.getJenkinsInformation = function(callback) {
		var url = this.options.getJenkinsUrl() + api;
		url += "?tree=description";
		this.$http.get(url).success(function(data) {
			callback.success(data);
		})
		
	};
	
	Jenkins.prototype.getJobs = function(callback) {
		var url = this.options.getJenkinsUrl() + api;
		url += "?tree=jobs[name,color,url]"
		this.$http.get(url).success(function(data) {
			callback.success(data.jobs);
		}).error(function(data)  {
			callback.error(data);
		});
	};
	
	return Jenkins;
})();
