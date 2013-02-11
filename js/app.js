'use strict';
angular.module('jenkins-notifier', [], function($provide) {
	$provide.factory('jenkins', ['options', '$http', function(options, $http) {
		var j = new Jenkins(options, $http);
		
		return j;					
	}]);
	
	$provide.factory('options', ['$log', function($log){
		var o =  new Options($log);
		return o;
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
