/**
 * @author nw
 */
function PopupControl($scope, $timeout, log, storage, jenkins) {
	$scope.options = {};
	
	$scope.jobs = {};
	
	$scope.loadOptions = function() {
		storage.get('options', function(opt) {
			$scope.$apply(function(){
				$scope.options = opt;
				loadInformation();
				loadJobs();
			});
		});
	}
	
	$scope.jenkinsDesc = undefined;
	
	var loadJobs = function() {
		jenkins.getJobs({
			success: function(jobs) {
				angular.forEach(jobs, function(value) {
					if (isJobContained(value)) {
						$scope.jobs[value.name] = value;
					}
				});
			},
			error: function(data) {
				log.error(data);
			}
		})
	}
	
	var loadInformation = function() {
		jenkins.getJenkinsInformation({
			success: function(data) {
				$scope.jenkinsDesc = data.description;
			}
		});
	}
	
	var isJobContained = function(job) {
		return $scope.options.jobs[job.name] != undefined;
	}
	
}
