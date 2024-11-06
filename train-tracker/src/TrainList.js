import Amtrak from './AmtrakAPI';
import React from 'react';
import './TrainList.css';

function TrainList(){
    // simple component just to test stuff
    function MakeTrain({
        train = new Amtrak.Train()
    }){
        var lastAt = "";
        var dir = "";
        var status = "";
        if (train.heading){
            dir = " (" + train.heading + ")";
        }
        if (train.stations[train.lastVisitedStation]){
            lastAt = ", last at " + train.stations[train.lastVisitedStation].stationCode;
        }
        if (train.punctuality){
            status = " (" + train.punctuality + ")";
        }

        return (
            <div className = 'spacing'>
                <div className = 'train'>
                    <h2>#{train.number} {train.routeName}{dir} </h2>
                    <p>
                        {train.from} to {train.to}{lastAt}{status}
                    </p>
                </div>
            </div>
            
        )
    } 

    const [trainList, setTrainList] = React.useState([]);
    const trainData = new Amtrak.APIInstance();

    // use once pattern
    React.useEffect(() => {
        trainData.onUpdated = function() {
            setTrainList(this.trains);
        }
        trainData.update();
    },[])
    
    if (trainList.length != 0){
        return (
            <div className = 'trainList'>
                {
                    trainList.map(t =>
                        <MakeTrain train = {t}/>
                    )
                }
            </div>
        )
    }

    const testTrain = new Amtrak.Train();
    testTrain.routeName = "Northeast Regional";
    testTrain.number = 5;

    return (
        <div>
            <MakeTrain train = {testTrain}/>
        </div>
    )

}

export default TrainList;