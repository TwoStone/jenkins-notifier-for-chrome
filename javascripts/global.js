var API_SUB = "/api/json";

$.ajaxSetup({
	"error" : function() {
		$.fn.desktopNotify({
			picture : getIcon("FAILURE"),
			title : "Failed to access to Jenkins",
			text : localStorage["jenkins-url"]
		});
	}
});

function appendLastSlash(url) {
    var lastChar = url.substring(url.length - 1);
    if (lastChar != "/") {
        return url + "/";
    }
    return url;
}

function getIcon(result) {
    var url = "images/blue.png";
    if (result == "UNSTABLE") {
        url = "images/yellow.png";
    } else if (result == "FAILURE") {
        url = "images/red.png";
    } else if (result == "ABORTED") {
        url = "images/grey.png";
    }
    return url;
}

function getColor(result) {
    var color = [0, 0, 255, 200];
    if (result == "UNSTABLE") {
        color =  [255, 255, 0, 200];
    } else if (result == "FAILURE") {
        color = [255, 0, 0, 200];
    } else if (result == "ABORTED") {
        color = [200, 200, 200, 200];
    }
    return color;
}

function getJobs() {
	var jobString = localStorage["jobs"];
	return jobString.split(",");
}
