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
        document.addEventListener('resume', this.onResume, true);
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
						if (locale.value == 'ro-RO') {
							LANG = LANG_RO;
						} else {
							LANG = LANG_EN;
						}
					},
					function () { //If a locale doesn't exists then this will be executed
						LANG = LANG_EN;
					}
			);
    	} else { //Hack to make the application work on PC too
			LANG = LANG_EN;
    	}
    	
    	//Hide views which are not the mainView
    	$("#busesView").hide();
    	$("#selectView").hide();
    	
    	//Set i18n for button labels
    	$("#btnToWork b").html(" " + LANG.btn_going_to_work);
    	$("#btnFromWork b").html(" " + LANG.btn_back_from_work);
    	$("#btnTimetable b").text(" " + LANG.btn_timetable);
    	
    	//Handler for clicking on btnToWork button 
    	$("#btnToWork").click(function() {
    		$("#mainView").hide();
    		$("#busesView").empty();
    		$("#busesView").show();
    		$("#busesView").append("<h4>" + LANG.label_main + "</h4>");
    		
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
    	
    	if ($("#mainView").is(":visible")) { //pressing back on mainView results in killing the application
    		navigator.app.exitApp();
    	}
    	
    	if ($("#busesView").is(":visible")) { //busesView is the child of mainView
    		$("#busesView").hide();
    		$("#mainView").show();
    	}
    	
    	if ($("#selectView").is(":visible")) { //selectView is the child of mainView
    		$("#selectView").hide();
    		$("#mainView").show();
    	}
    },
    
    // resume event handler
    //
    onResume: function() {
    	alert("onResume");
		$("#busesView").hide();
		$("#selectView").hide();
		$("#mainView").show();
    },
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
