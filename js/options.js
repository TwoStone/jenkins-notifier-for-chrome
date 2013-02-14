/**
 * Options Service for the Jenkins Notifier.
 */
var Options = function($log) {
	
	var options;
	
	this.load = function(callback) {
        $log.info("Loading options");
		chrome.storage.local.get('options', function(opt) {
			if (opt.options) {
				options = opt.options;
				callback(opt.options);
			}
		});
	};
	
	this.save = function(opt, callback) {
		$log.info("Saving options");
		chrome.storage.local.set({'options': opt}, callback);
		options = opt;
	};
	
	this.getJenkinsUrl = function() {
		return options.jenkins_url;
	};
	
	this.getInterval = function() {
		return options.interval;
	};
	
	this.getOptions = function() {
		return options;
	};
	
	this.getJobs = function() {
		return options.interval;
	};
};
