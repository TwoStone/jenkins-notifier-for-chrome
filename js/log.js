/**
 * @author nw
 */
var Log = function($log) {
	
	this.debugOn = false;
	
	this.info = $log.info;
	
	this.error = $log.error;
	
	this.warn = $log.warn;
	
	this.log = $log.log;
	
	this.debug = function(message) {
		if (this.debugOn) {
			console.debug(message);
		}
	}
}
