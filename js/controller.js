/**
 * @author nw
 */
function OptionsControl($scope, $http, $timeout, log, storage, jenkins) {
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
		save();
		load();
	}
	
	$scope.subscribe = function(job) {
		moveJob(job, $scope.jobs, $scope.options.jobs);
		save();
		
	}
	
	$scope.unsubscribe = function(job) {
		moveJob(job, $scope.options.jobs, $scope.jobs);
		save();
	}
	
	var save = function() {
		storage.set('options', $scope.options);
	}
	
	var load = function() {
		storage.get('options', function(opt) {
			angular.extend($scope.options, opt);
			jenkins.getJobs({
				success: addJobs,
				error: function(data) {
					log.error(data);
				}
			});
		})
	}
	
	var moveJob = function(job, src, dst) {
		if (!$scope.$$phase) {
			$scope.$apply(function() {
				moveJob(job, src, dst);			
			});
			return;
		}
		dst[job.name] = src[job.name];
		delete src[job.name];
	}
	
	var showInfo = function(info) {
		$scope.infos.push(info);
		$timeout(function(){
			$scope.infos.pop();
		}, 2000);
	}
	
	var addJobs = function(jobs) {
		angular.forEach(jobs, function(value, key) {
			addJob(value);
		});
	}
	
	var addJob = function(job) {
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
