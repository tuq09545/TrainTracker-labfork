//Client-Side Objects and Functions for reading/manipulating decoded data returned from server
function Station() {
    this.stationCode = null;
    this.getStationName = function(){
        //use table to convert from 3-letter codes
    }

    this.hasArrived = false;
    this.hasDeparted = false;

    //if hasDeparted and/or hasArrived are false, departureTime and arrivalTime are estimates

    this.arrivalTime = null;
    this.departureTime = null;

}
function Train() {
    this.number = null;
    this.routeName = null;
    this.from = null;
    this.to = null;
    this.speed = null;
    this.heading = null;
    this.lastUpdate = null;
    this.lastVisitedStation = null;
    this.punctuality = null;
    this.state = null;
    this.stations = [];//of type StationInfo[]
    this.toString = function() {
        return this.routeName + " Train #" + this.number +
            "\nGoing " + Math.trunc(this.speed) + " Mph Heading " + this.heading + " from " + this.from + " to " + this.to +
            "\nReported running " + this.punctuality + " by most recently visited stop " + this.lastVisitedStation + "\n";
    }
}

function TrainData() {
    this.lastUpdate = null;
    this.trains = null;
    this.onUpdated = function(){};
    this.update = function() {
        getTrainList().then(data => {
            this.trains = data;
            this.lastUpdate = Date.now();
            this.onUpdated();
        })
    }
}


async function getApiJSONData() {
    return fetch("http://localhost:3001/getTrainsData").then(
        res => res.json()
    )
}


async function getTrainList() {
    let apiData = await getApiJSONData();

    let trainList = new Array(apiData.features.length);

    for(let i = 0; i < apiData.features.length; i++) {
        let train = apiData.features[i].properties;

        let lastStationReport = null;
        let nextStationReport = null;
        let lastStationIndex = -1;

        for(let stationNumber = 1; stationNumber <= 20; stationNumber++) {
            let currentStation = train["Station"+stationNumber];
            if(currentStation == null) break;
            currentStation = JSON.parse(currentStation);

            if(currentStation.postdep == null) {
                lastStationIndex = stationNumber - 2;
                nextStationReport = currentStation;
                break;
            }
            lastStationReport = currentStation;
        }

        if(lastStationReport == null) {
            lastStationReport = nextStationReport
        }


        const tempTrain = new Train()
        tempTrain.number = train.TrainNum;
        tempTrain.routeName = train.RouteName
        tempTrain.speed = train.Velocity;
        tempTrain.heading = train.Heading;
        tempTrain.from = train.OrigCode;
        tempTrain.to = train.DestCode;
        tempTrain.scheduledDeparture = train.OrigSchDep;
        tempTrain.lastUpdate = train.updated_at;
        tempTrain.punctuality = lastStationReport.postcmnt;
        tempTrain.lastVisitedStation = lastStationIndex;
        tempTrain.state = train.TrainState;

        trainList[i] = tempTrain;
    }

    return trainList;
}

module.exports = {
    Station,
    Train,
    TrainData
}