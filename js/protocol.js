/**
 * @author nw
 */
var Protocol;

Protocol = function() {
	
	function Protocol(name) {
		this.name = name;
	}
	
	Protocol.prototype.isPolling = function() {
		return false;
	}
	
	Protocol.prototype.isWebsocket = function() {
		return false;
	}
	
}();


var Polling;

Polling = function(_super) {
	
	angular.extend(Polling, _super);
	
	function Polling(name, interval) {
		_super(name);
		this.interval = interval;
	}
	
	Polling.prototype.isPolling = function() {
		return true;
	}
	
} (Protocol);

var Websocket;

Websocket = function(_super) {
	
	angular.extend(Websocket, _super);
	
	function Websocket(name, port) {
		_super(name);
		this.port = port;
	}
	
	Websocket.prototype.isWebsocket = function() {
		return true;
	}
	
}(Protocol);
