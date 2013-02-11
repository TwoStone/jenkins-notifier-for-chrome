/**
 * @author nw
 */
function PopupControl($scope, $timeout, $log, options, jenkins) {
	$scope.options = {};
	
	$scope.jobs = {};
	
	$scope.loadOptions = function() {
		options.load(function(opt){
			$scope.$apply(function(){
				$scope.options = opt;
				loadInformation();
				loadJobs();
			});
		})
		
	}
	
	$scope.jenkinsDesc = undefined;
	
	loadJobs = function() {
		jenkins.getJobs({
			success: function(jobs) {
				angular.forEach(jobs, function(value) {
					if (isJobContained(value)) {
						$scope.jobs[value.name] = value;
					}
				});
			},
			error: function(data) {
				$log.error(data);
			}
		})
	}
	
	loadInformation = function() {
		jenkins.getJenkinsInformation({
			success: function(data) {
				$scope.jenkinsDesc = data.description;
			}
		});
	}
	
	isJobContained = function(job) {
		return $scope.options.jobs[job.name] != undefined;
	}
	
}
