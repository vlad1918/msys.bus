var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    	//Initialize the LANG array depending on the locale
    	LANG = {};
    	if (navigator != null && navigator.globalization != null) {   	
			navigator.globalization.getLocaleName(
					function (locale) { //If a valid locale exists then this will be executed
						alert('locale: ' + locale.value + '\n');
						if (locale.value == 'ro-RO') {
							LANG = LANG_RO;
						} else {
							LANG = LANG_EN;
						}
					},
					function () { //If a locale doesn't exists then this will be executed
						alert('Error getting locale1\n');
						LANG = LANG_EN;
					}
			);
    	} else { //If navigator.globalization doesn't exists then this will be executed
			alert('Error getting locale\n');
			LANG = LANG_EN;
    	}
    	
    	//Hide views which are not main
    	$("#busesView").hide();
    	$("#selectView").hide();
    	
    	//Handler for clicking on btnToWork button 
    	$("#btnToWork").click(function() {
    		$("#mainView").hide();
    		$("#busesView").empty();
    		$("#busesView").show();
    		$("#busesView").append(LANG.label_main);
    		
    		var now = new Date();
    		var currentTime = now.getHours() + ":" + now.getMinutes();
    		var workDay = (now.getDay() == 5) ? FRIDAY : MON_THU;
    		var buses = getBuses(currentTime, true, workDay);
    		
    		for ( var i = 0; i < buses.length; i++) {
//    			$("#busesView").append("<div class=\"well well-lg\">" + buses[i].time + "</div>");
    			$("#busesView").append(createBusView(buses[i]));
			}    		
    	});
    	
    },
    
    // back button Event Handler
    //
    onBackButton: function() {
    	alert("back pressed");
    	
    	if ($("#busesView").is(":visible")) {
    		$("#busesView").hide();
    		$("#mainView").hide();
    	}
    }
    
};

/**
 * Creates a bus view well
 */
function createBusView(bus) {
	var main = document.createElement("div");
	main.className = "well well-sm marginBtmSmall"; 
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	
	var tdTime = document.createElement("td");
	tdTime.className = "busTime"
	tdTime.innerHTML = bus.time;	
	tr.appendChild(tdTime);
	
	var tdImg = document.createElement("td");
	var img = document.createElement("img");
	img.src = "img/mini_bus.png"
	tdImg.appendChild(img);
	tr.appendChild(tdImg);
	
	var tdLegend = document.createElement("td");
	tdLegend.className = "busLegend";
	tdLegend.innerHTML = LANG.legend_part_1 + " " + bus.startStation + " " + LANG.legend_part_2 + " " + bus.endStation;	
	tr.appendChild(tdLegend);
		
	table.appendChild(tr);
	main.appendChild(table);
	
	return main;
}
