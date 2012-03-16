$(function() {
    function eachField(f) {
        $(".text").each(function(_, elem) {
            var elem = $(elem);
            f(elem);
        });
    }

    function restore() {
        eachField(function(elem) {
            var name = elem.attr("name");
            elem.attr( "value", localStorage[name]);
        });
        
        if (localStorage["jenkins-url"] != undefined && localStorage["jenkins-url"] != "") {
        	loadJobs();
        }

        if(localStorage['use-websocket'] == 'true') {
            $("#use-websocket").attr("checked","checked")
        }else{
            $("#use-websocket").attr("checked",false)
        }
        update();
    }
    function save() {
        eachField(function(elem) {
            var name = elem.attr("name");
            localStorage[name] = elem.attr("value");
        })
        localStorage['use-websocket'] = $("#use-websocket").attr("checked");
        saveJobSettings();
        chrome.extension.getBackgroundPage().window.location.reload();
    }
    function update(){
        if($("#use-websocket").attr("checked")){
            $("#websocket-url").attr("disabled","");
        }else{
            $("#websocket-url").attr("disabled","disabled");
        }
    }
    
    function saveJobSettings() {
    	var jobs = new Array();
    	$("#jobs>table>tbody>tr").each(function(i, e) {
    		var element = $(e);
    		if (element.children().children("input").attr("checked"))
    			jobs.push(element.data("name"));
    	});
    	localStorage["jobs"] = jobs;
    }
    
    function loadJobs() {
    	var url = $('#jenkins-url').attr("value");
    	localStorage['jenkins-url'] = url;
    	url = url + API_SUB;
    	$.getJSON(url, function(json) {
    		var table = $('#jobs>table>tbody');
    		table.empty();
    		$(json.jobs).each(function(i, e) {
    			table.append($('<tr/>')
    					.append($('<td/>').append($('<input type="checkbox"/>')))
    					.append($('<td/>').append(getImageElement(e.color)))
    					.append($('<td/>').append($('<a/>').attr('href',e.url).text(e.name))).data('name',e.name).data('url',e.url));
    		});
    		
    		var jobs = localStorage["jobs"].split(",");
            $("#jobs>table>tbody>tr").each(function(i, e) {
            	var element = $(e);
            	if (contains(jobs, element.data("name"))) {
            		element.children().children("input").attr("checked", true);
            	}
            });
    		
    	});
    }
    
    
    
    function getImage(color) {
    	var strings = color.split("_");
    	return $('<img/>').attr("src", "images/" + strings[0] + ".png").css("width","16px");
    }
    
    $.ajaxSetup({
    	"error" : function() {
    		window.alert("Failed to access Jenkins " + localStorage["jenkins-url"]);
    	}
    });

    restore();
    $(".save").bind("click", function(e) {
        e.preventDefault();
        save();
        window.close();
    });
    
    $(".load").click(function(e) {
    	loadJobs();
    });

    $("#use-websocket").bind("change",function(e){
        update();
    })
});
