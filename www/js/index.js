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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    	//Hide views which are not main
    	$("#busesView").hide();
    	$("#selectView").hide();
    	
    	//Handler for clicking on btnToWork button 
    	$("#btnToWork").click(function() {
    		$("#mainView").hide();
    		$("#busesView").empty();
    		$("#busesView").show();
    		
    		var now = new Date();
    		var currentTime = now.getHours() + ":" + now.getMinutes();
    		var workDay = (now.getDay() == 5) ? FRIDAY : MON_THU;
    		var buses = getBuses(currentTime, true, workDay);
    		
    		for ( var i = 0; i < buses.length; i++) {
//    			$("#busesView").append();
//    			$("#busesView").append("<div class=\"well well-lg\">" + buses[i].time + "</div>");
    			$("#busesView").append(createBusView(buses[i]));
			}    		
    	});
    	
    },
};

/**
 * Creates a bus view well
 */
function createBusView(bus) {
	var main = document.createElement("div");
	main.className = "well"; 
	
	var img = document.createElement("img");
	img.src = "img/mini_bus.png"
	
	var time = document.createElement("span");
	time.className = "big"
	time.innerHTML = bus.time;	
		
		
	main.appendChild(img);
	main.appendChild(time);
	
	return main;
}
