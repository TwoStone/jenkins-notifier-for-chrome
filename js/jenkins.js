var Jenkins;

Jenkins = (function() {
	
	function Jenkins(options, $http) {
		this.$http = $http;
		
		var $this = this;
		options.load(function(opt) {
			$this.options = opt;
		});
	}
	
	Jenkins.prototype.getJobs = function() {
		console.log("test");
	};
	
	return Jenkins;
})();
