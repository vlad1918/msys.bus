/**
 * Database for the buses
 */

/*** Create arrays for all available buses ***/

//Buses to work MON-THU
toWorkMonThu = [
  {time : "16:40", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "17:05", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "17:30", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "17:45", workDay : MON_THU, isApproximate : false, busType : BIG_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},

  {time : "26:40", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "27:05", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "27:30", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "27:45", workDay : MON_THU, isApproximate : false, busType : BIG_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "36:40", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "37:05", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "37:30", workDay : MON_THU, isApproximate : false, busType : MINI_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS},
  {time : "37:45", workDay : MON_THU, isApproximate : false, busType : BIG_BUS, startStation : AUREL_VLAICU, endStation : METRO_SYSTEMS}
];


/*** DB functions ***/

/**
 * Gets all buses that need to leave after the currentTime
 * @param currentTime - time in "HH:mm" string format
 * @param goingToWork - boolean
 * @param workDay - either MON_THU or FRIDAY
 * @returns array of objects in the format {time : "", workDay : "", isApproximate : false, busType : "", startStation : "", endStation : ""}
 */
function getBuses(currentTime, goingToWork, workDay) {
	var buses = []; //empty array will be populated below
	if (goingToWork) {
		if (workDay == MON_THU) {
			for ( var i = 0; i < toWorkMonThu.length; i++) {
				if (toWorkMonThu[i].time > currentTime) {
					buses.push(toWorkMonThu[i]);
				}
			}
		} else {
			
		}
	} else {
		if (workDay == MON_THU) {
			
		} else {
			
		}
	}
	
	return buses;
}
