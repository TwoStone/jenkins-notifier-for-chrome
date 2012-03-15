$(function() {
	
	var jobs = getJobs();
	var popup = $("#popup");
	$("#jenkins-url").text(getJenkinsUrl());
	
	$(jobs).each(function(i,e) {
		fetchBuild(e,createJobRow);
	});
	
	function createJobRow(job) {
		var jobEl = $("<div/>").addClass("job");
		jobEl.append($("<div/>").addClass("state").append($("<img/>").attr("src",getIcon(job.result))));		
		jobEl.append($("<div/>").addClass("name").append($("<a/>").attr("href",job.url).attr("target","_blank").text(job.fullDisplayName)));
		popup.append(jobEl);
	}
	
	
});

