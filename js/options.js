/**
 * Options Service for the Jenkins Notifier.
 */
var Options;
Options = (function() {
	
	var options = undefined;
	
	function Options($log) {
		this.log = $log;
	}
	
	Options.prototype.load = function(callback) {
		this.log.info("Loading options");
		var $this = this;
		chrome.storage.local.get('options', function(opt) {
			if (opt.options) {
				options = opt.options;
				callback(opt.options);
			}
		});
	};
	
	Options.prototype.save = function(opt, callback) {
		this.log.info("Saving options");
		chrome.storage.local.set({'options': opt}, callback);
		options = opt;
	};
	
	Options.prototype.getJenkinsUrl = function() {
		return options.jenkins_url;
	};
	
	Options.prototype.getInterval = function() {
		return options.interval;
	};
	
	Options.prototype.getOptions = function() {
		return options;
	};
	
	Options.prototype.getJobs = function() {
		return options.interval;
	};
	
	
	
	return Options;
})();
