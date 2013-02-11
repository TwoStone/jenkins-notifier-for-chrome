/**
 * Options Service for the Jenkins Notifier.
 */
var Options;
Options = (function() {
	
	function Options() {
	}
	
	Options.prototype.load = function(callback) {
		var $this = this;
		chrome.storage.local.get('options', function(opt) {
			if (opt.options) {
				callback(opt.options);
			}
		});
	};
	
	Options.prototype.save = function(opt, callback) {
		chrome.storage.local.set({'options': opt}, callback);
	};
	
	return Options;
})();
