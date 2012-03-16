$(function() {
	
	var jobs = getJobs();
	var popup = $("#popup");
	$("#jenkins-url").append(newAnchor(getJenkinsUrl()));
	
	$(jobs).each(function(i,e) {
		fetchBuild(e,createJobRow);
	});
	
	function createJobRow(job, result , jobname) {
		if (result == "success") {
			fetchJobState(jobname, function(json, xhrresult) {
				if (xhrresult == "success") {
					var jobEl = $("<div/>").addClass("job");
					jobEl.append($("<div/>").addClass("state").append(getImageElement(json.color)));		
					jobEl.append($("<div/>").addClass("name").append($("<a/>").attr("href",job.url).attr("target","_blank").text(job.fullDisplayName)));
					popup.append(jobEl);
				}
			});
		}
	}
	
	
});

