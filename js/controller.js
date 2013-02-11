/**
 * @author nw
 */
function OptionsControl($scope, $http, $timeout, $log, options, jenkins) {
	$scope.options = {
		jenkins_url: undefined,
		interval: undefined,
		jobs: {}
	};
	
	$scope.infos = [];
	$scope.jobs = {};
	
	$scope.saveOptions = function() {
		save();
	};
	
	$scope.loadOptions = function() {
		load();
	}
	
	$scope.urlLostFocus = function() {
		if ($scope.options.jenkins_url != options.getJenkinsUrl()) {
			save();
			load();
		}
	}
	
	$scope.subscribe = function(job) {
		moveJob(job, $scope.jobs, $scope.options.jobs);
		save();
		
	}
	
	$scope.unsubscribe = function(job) {
		moveJob(job, $scope.options.jobs, $scope.jobs);
		save();
	}
	
	save = function() {
		options.save($scope.options, function() {
			$log.info("Options saved!");
		});
	}
	
	load = function() {
		options.load(function(opt) {
			$scope.$apply(function () {
				angular.extend($scope.options, opt);
				jenkins.getJobs({
					success: addJobs,
					error: function(data) {
						$log.error(data);
					}
				});
			})
		})
	}
	
	moveJob = function(job, src, dst) {
		if (!$scope.$$phase) {
			$scope.$apply(function() {
				moveJob(job, src, dst);			
			});
			return;
		}
		dst[job.name] = src[job.name];
		delete src[job.name];
	}
	
	showInfo = function(info) {
		$scope.infos.push(info);
		$timeout(function(){
			$scope.infos.pop();
		}, 2000);
	}
	
	addJobs = function(jobs) {
		angular.forEach(jobs, function(value, key) {
			addJob(value);
		});
	}
	
	addJob = function(job) {
		if (!$scope.jobs) $scope.jobs = {};
		
		if (!$scope.options.jobs[job.name]) {
			if (!$scope.$$phase) {
				$scope.$apply(function() {
					$scope.jobs[job.name] = job;				
				});
			} else {
				$scope.jobs[job.name] = job;	
			}
		}
	}
	
	
}
