/**
 * @author nw
 */
function OptionsControl($scope, $http, $timeout, options, jenkins) {
	$scope.options = {
		jenkins_url: undefined,
		interval: undefined
	};
	
	$scope.infos = [];
	
	$scope.saveOptions = function() {
		options.save($scope.options, function() {
			showInfo("Options saved!");
			jenkins.getJobs();
		});
	};
	
	$scope.loadOptions = function() {
		options.load(function(opt) {
			$scope.$apply(function () {
				$scope.options = opt;
				showInfo("Options loaded!");
			})
		})
	}
	
	$scope.jobs = [
		{
			name:"Job1",
			imgSrc: function() {
				return "img/blue.png";
			},
				
			watched:true
		}
	];
	
	showInfo = function(info) {
		$scope.infos.push(info);
		$timeout(function(){
			$scope.infos.pop();
		}, 2000);
	}
}
