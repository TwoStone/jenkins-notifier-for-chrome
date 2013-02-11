$(function() {
	
	var jobs = getJobs();
	var popup = $("#popup");
	$("#jenkins-url").append(newAnchor(getJenkinsUrl()));
	
//	$(jobs).each(function(i,e) {
//		fetchBuild(e,createJobRow);
//	});
	getJobDetails();
	
	function createJobRow(job) {
			var jobEl = $("<div/>").addClass("job");
		jobEl.append($("<div/>").addClass("state").append(
				getImageElement(job.color)));
		jobEl.append($("<div/>").addClass("name").append(
				$("<a/>").attr("href", job.lastBuild.url).attr("target", "_blank").text(
						job.lastBuild.fullDisplayName)));
		popup.append(jobEl);
	}
	
	function getJobDetails() {
		var url = appendLastSlash(getJenkinsUrl()) + API_SUB + "?tree=jobs[name,url,color,lastBuild[number,url,result,fullDisplayName]]";
		$.getJSON(url, function(json, result){
			if (result == "success") {
				$(json.jobs).each(function(i, e) {
					if (contains(jobs, e.name)) {
						createJobRow(e);
					}
				});
			}
		});
	}
	
});

