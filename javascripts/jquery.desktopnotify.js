/**
 * jQuery plugin to use webkit Notifications
 * @author RAISIN
 * @lisence MIT Lisence
 * @version 0.0.1
 */
(function($){
    $.fn.desktopNotifyAddPermission = function(options) {
        this.click(function(e) {
            if (window.webkitNotifications) {
                if (window.webkitNotifications.checkPermission()) {
                    window.webkitNotifications.requestPermission();
                }
            }
        });
        return this;
    };
    $.fn.desktopNotify = function(options) {
        var defaults = {
            picture : "",
            title : "",
            text : "",
            ondisplay : ondisplay,
            onclose : onclose,
            fade : false,
            timeout: 10000
        };

        var ondisplay = function() {};
        var onclose = function() {};

        var setting = $.extend(defaults, options);
        if (window.webkitNotifications) {
            if (!window.webkitNotifications.checkPermission()) {
                var popup = window.webkitNotifications.createNotification(
                    setting.picture,
                    setting.title,
                    setting.text
                );
                popup.ondisplay = setting.ondisplay;
                popup.onclose = setting.onclose;
                popup.show();
                
                if (setting.timeout) {
                	setTimeout(function(){
                		if (popup.cancel) {
                			popup.cancel();
                		}
                	}, setting.timeout);
                }
            }
        }

        return this;
    };
    /**
     * Displays a html desktop notification.  
 	 * @param options Options for the notification [site, ondisplay, onclose, fade, timeout]
     */
    $.fn.desktopHtmlNotify = function(options) {
    	var defaults = {
            site = "popup.html"
            ondisplay : ondisplay,
            onclose : onclose,
            fade : false,
            timeout: 10000
        };
    	
        var ondisplay = function() {};
        var onclose = function() {};
    	
    	var setting = $.extend(defaults, options);
    	
    	if (window.webkitNotifications && !window.webkitNotifications.checkPermission()) {
    		var popup = webkitNotifications.createHTMLNotification(
    			site
    		);
    		popup.ondisplay = setting.ondisplay;
            popup.onclose = setting.onclose;
            popup.show();
            
            if (setting.timeout) {
            	setTimeout(function(){
            		if (popup.cancel) {
            			popup.cancel();
            		}
            	}, setting.timeout);
            }
    	}
    }
})(jQuery);
