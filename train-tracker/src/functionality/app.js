/**
 * Function allowing filtering of train objects based on search criteria.
 * @function
 * @param {object[]} allTrains - The list of all train objects available through the Amtrak API.
 * @param {object} sObj - The object containing search criteria (number, route, stations, upcoming).
 * @returns {object[]} The list of train objects matching the search criteria.
 * @exports filterTrains
 */
export function filterTrains(allTrains, sObj) {
    let trains = allTrains ?? [];
    if (sObj.number > 0){
        trains = trains.filter(t => t.number === sObj.number)
    } if (sObj.route){
        trains = trains.filter(t => t.routeName === sObj.route)
    } if (sObj.station){
        trains = trains.filter((t) => (t.stations.findIndex((station) => station.stationCode === sObj.station) !== -1));
        if (sObj.upcoming){
            trains = trains.filter((t) => {
                let station = t.stations.find((station) => station.stationCode === sObj.station);
                if (station.stationCode === t.from && station.hasDeparted){
                    return undefined;
                }
                if (!station.hasArrived || !station.hasDeparted){
                    return t;
                }
            })
        }
    } if (sObj.fromStation && sObj.toStation){
        trains = trains.filter((t) =>{
            return t.stations.findIndex((station) => station.stationCode === sObj.fromStation) < t.stations.findIndex((station) => station.stationCode === sObj.toStation);
        })
        if (sObj.upcoming){
            trains = trains.filter((t) => {
                let station = t.stations.find((station) => station.stationCode === sObj.toStation);
                if (station.stationCode === t.from && station.hasDeparted){
                    return undefined;
                }
                if (!station.hasArrived || !station.hasDeparted){
                    return t;
                }
            })
        }
    } if (sObj.date){
        trains = trains.filter(t => t.scheduledDeparture === sObj.date)
    }
    // sort results by number (ascending)
    trains = sortTrains(trains, (a,b) => a.number - b.number);
    return trains;
}

/**
 * Function finding closest Amtrak station to user location.
 * @function
 * @param {object[]} stations - The list of all stations available through the Amtrak API.
 * @param {object} userLocation - The object containing user location information.
 * @returns {object} The closest station to the user.
 * @exports getClosestStation
 */
export function getClosestStation(stations, userLocation){
    let userLat = userLocation.coords.latitude;
    let userLon = userLocation.coords.longitude;
    let minDistance = calculateDistance(stations[0].lat, userLat, stations[0].lon, userLon);
    let minStation = stations[0];
    stations.forEach((station) => {
        let distance = calculateDistance(station.lat, userLat, station.lon, userLon);
        if (distance < minDistance){
            minDistance = distance;
            minStation = station;
        }
    });
    return minStation;
}

/**
 * Function converting Amtrak station code to station object.
 * @function
 * @param {object[]} allStations - The list of all stations available through the Amtrak API.
 * @param {string} stationCode - The station code string.
 * @returns {object} The station matching the station code provided.
 * @exports convertStationCodeToStation
 */
export function convertStationCodeToStation(allStations, stationCode){
    let matchingStations = allStations.filter((station) => {
        return station.stationCode === stationCode;
    });
    return matchingStations[0];
}

/**
 * Function calculating distance between two points.
 * @function
 * @param {number} lat1 - The first latitude.
 * @param {number} lat2 - The second latitude.
 * @param {number} lon1 - The first longitude.
 * @param {number} lon2 - The second longitude.
 * @returns {number} The distance between the two points.
 */
function calculateDistance(lat1, lat2, lon1, lon2){
    return (Math.sqrt(Math.pow(lat2-lat1, 2) + Math.pow(lon2-lon1, 2)));
}

/**
 * Function sorting trains by criteria.
 * @function
 * @param {object[]} trains - The list of train objects to sort.
 * @param {fucntion} sortingCriteria - The comparison function.
 * @returns {object[]} The sorted train objects.
 */
function sortTrains(trains, sortingCriteria){
    return trains.sort(sortingCriteria);
}