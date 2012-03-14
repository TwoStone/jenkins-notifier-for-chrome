$(function(){
    var apiUrl = localStorage["jenkins-url"];
    var jobName = localStorage["job-name"];
    var jobs = getJobs();
    var useWebsocket   = localStorage["use-websocket"];
    var websocketUrl   = localStorage["websocket-url"];

    
    
    if (apiUrl == null || jobName == null || (useWebsocket == 'true' && websocketUrl == null)) {
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
    var JOB = "job/"
    var BUILD_NUMBER = "lastBuild"
    var POLLING_TIME = 60 * 1000;

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

 

    // replace popup event
   // chrome.browserAction.setPopup({popup : ""});
//    chrome.browserAction.onClicked.addListener(function(tab) {
//        window.open(apiUrl + JOB + jobName);
//    });

    function fetch(apiUrl, num) {
        fetch(apiUrl,num, jobName);
    }
    
    function fetch(apiUrl, num, job) {
        if (num == null) {
            num = BUILD_NUMBER;
        }
        var url = apiUrl + JOB + job + "/" + num + API_SUB;

        $.getJSON(url, function(json, result) {
            if (result != "success") {
                return;
            }
            if (prevBuild != json.number) {
                prevBuild = json.number;
                chrome.browserAction.setBadgeText({text: String(json.number)});
                chrome.browserAction.setBadgeBackgroundColor({color: getColor(json.result)});
                $.fn.desktopNotify(
                    {
                        picture: getIcon(json.result),
                        title: "#" + json.number + " (" + json.result + ")",
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
            if (obj.project == jobName) {
                fetch(apiUrl, obj.number);
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
        fetch(apiUrl, BUILD_NUMBER); // first fetch
        setInterval(function() {
            fetch(apiUrl, BUILD_NUMBER);
        }, POLLING_TIME);
    }
});
