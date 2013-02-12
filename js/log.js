/**
 * @author nw
 */
var Log = function($log) {
	
	this.info = $log.info;
	
	this.error = $log.error;
	
	this.warn = $log.warn;
	
	this.log = $log.log;
	
	this.debug = function(message) {
		console.debug(message);
	}
}
