var API_SUB = "/api/json";
var JOB = "job/";
var BUILD_NUMBER = "lastBuild";

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

function getJenkinsUrl() {
	return localStorage["jenkins-url"];
}

function getPollingInterval() {
	return localStorage["polling-interval"] * 1000;
}

function fetchJobState(jobname, callback) {
	var url = appendLastSlash(getJenkinsUrl()) + JOB + jobname + API_SUB;
	$.getJSON(url, function(json, result) {
		callback(json, result);
	});
}


function fetchBuild(jobname, callback, buildNum) {
	if (buildNum == null) {
		buildNum = BUILD_NUMBER;
	}
	var url = appendLastSlash(getJenkinsUrl()) + JOB + appendLastSlash(jobname) + buildNum + API_SUB;
	$.getJSON(url, function(json, result) {
		callback(json, result, jobname);
	});
}

function getImageElement(image) {
	if (image == "aborted") {
		image = "grey";
	}
	image = image.split("_")[0];
	var img = $("<img/>").attr("src","images/" + image + ".png").attr("alt",image);
	return img;
	
}

function contains(array, element) {
	var result = false;
	$(array).each(function(i, e) {
		if (e == element) {
			result = true;
		}
	});
	return result;
}

function newAnchor(href, text) {
	if (text == null)
		text = href;
	return $("<a/>").attr("href", href).attr("target","_blank").text(text);
}
