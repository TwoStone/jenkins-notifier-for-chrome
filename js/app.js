'use strict';
angular.module('jenkins-notifier', [], function($provide) {
	$provide.factory('jenkins', ['storage', '$http', 'log', function(storage, $http, log) {
		var j = new Jenkins(storage, $http, log);
		return j;					
	}]);
	
	$provide.factory('storage', ['log', function(log) {
		return new ChromeStorage(log);
	}]);
	
	$provide.factory('log', ['$log', function($log) {
		return new Log($log);
	}]);
}).directive( [ 'focus', 'blur', 'keyup', 'keydown', 'keypress' ].reduce( function ( container, name ) {
    var directiveName = 'ng' + name[ 0 ].toUpperCase( ) + name.substr( 1 );

    container[ directiveName ] = [ '$parse', function ( $parse ) {
        return function ( scope, element, attr ) {
            var fn = $parse( attr[ directiveName ] );
            element.bind( name, function ( event ) {
                scope.$apply( function ( ) {
                    fn( scope, {
                        $event : event
                    } );
                } );
            } );
        };
    } ];

    return container;
}, { } ) ).directive('ngTooltip', function(){
	return {
		replace: true,
		link: function(scope, element, attrs) {
			var ev = scope.$eval(attrs.ngTooltip);
			var el = $(element);
			attrs.$set("data-toggle","tooltip");
			attrs.$set("title", ev);
			el.tooltip({placement: "right"});
		}
	}
});
