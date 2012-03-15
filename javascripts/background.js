$(function(){
    var apiUrl = localStorage["jenkins-url"];
    var jobs = getJobs();
    var useWebsocket   = localStorage["use-websocket"];
    var websocketUrl   = localStorage["websocket-url"];

    
    
    if (apiUrl == null || jobs == null || (useWebsocket == 'true' && websocketUrl == null)) {
        return;
    }
    
    $.ajaxSetup({
    	"error" : function() {
    		$.fn.desktopNotify({
    			picture : getIcon("FAILURE"),
    			title : "Failed to access to Jenkins",
    			text : localStorage["jenkins-url"]
    		});
    	}
    });

    apiUrl = appendLastSlash(apiUrl);
    var prevBuild = -1;
    var prevBuilds = {};

    $.ajaxSetup({
        "error": function() {
            $.fn.desktopNotify(
                {
                    picture: getIcon("FAILURE"),
                    title: "Failed to access to Jenkins",
                    text : apiUrl
                }
            );
        }
    });

    function fetchAll() {
    	$(jobs).each(function(i, e) {
    		fetch(e);
    	});
    }

    function fetch(job, num) {
    	fetchBuild(job, function(json, result) {
            if (result != "success") {
                return;
            }
            if (prevBuilds[job] == undefined || prevBuilds[job]["number"] != json.number && prevBuilds[job]["result"] != json.result) {
                prevBuilds[job] = {};
            	prevBuilds[job]["number"] = json.number;
                prevBuilds[job]["result"] = json.result;
                
                chrome.browserAction.setBadgeText({text: String(json.number)});
                chrome.browserAction.setBadgeBackgroundColor({color: getColor(json.result)});
                $.fn.desktopNotify(
                    {
                        picture: getIcon(json.result),
                        title: json.fullDisplayName + " (" + json.result + ")",
                        text : json.actions[0].causes[0].shortDescription
                    }
                );
            }
        });
    }
    var retryTime = 2500;
    function bind(wsUrl, apiUrl) {
        var ws = $("<div />");

        ws.bind("websocket::connect", function() {
            console.log('opened connection');
            retryTime = 5000;
        });

        ws.bind("websocket::message", function(_, obj) {
            if (contains(jobs, obj.project)) {
                fetch(obj.project, obj.number);
            }
        });

        ws.bind("websocket::error", function() {
            $.fn.desktopNotify(
                {
                    picture: getIcon("FAILURE"),
                    title: "Failed to access to Jenkins Websocket Notifier. Please check your websocket URL",
                    text : wsUrl
                }
            );
        });

        // auto reconnect
        ws.bind('websocket::close', function() {
            console.log('closed connection');
            retryTime *= 2;
            setTimeout(function() {
                bind(websocketUrl, apiUrl);
            }, retryTime);
        });

        ws.webSocket({
            entry : wsUrl
        });
    }

    if (useWebsocket == 'true') {
        bind(websocketUrl, apiUrl);
    } else {
        fetchAll(); // first fetch
        setInterval(function() {
            fetchAll();
        }, getPollingInterval());
    }
});
