export function sortTrains(allTrains, selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation) {
    let trains = allTrains;
    if (selectedNumber > 0){
        trains = trains.filter(t => t.number === selectedNumber)
    } if (selectedRoute){
        trains = trains.filter(t => t.routeName === selectedRoute)
    } if (selectedStation){
        trains = trains.filter((t,index) => (t.stations.findIndex((station) => station.stationCode === selectedStation) !== -1));
        if (upcoming){
            trains = trains.filter((t, index) => {
                let station = t.stations.find((station) => station.stationCode === selectedStation);
                if (station.stationCode === t.from && station.hasDeparted){
                    return;
                }
                if (!station.hasArrived || !station.hasDeparted){
                    return t;
                }
            })
        }
    } if (fromStation && toStation){
        trains = trains.filter((t, index) =>{
            return t.stations.findIndex((station) => station.stationCode === fromStation) < t.stations.findIndex((station) => station.stationCode === toStation);
        })
    }
    // sort results by number
    trains.sort((a,b) => a.number - b.number);
    return trains;
}