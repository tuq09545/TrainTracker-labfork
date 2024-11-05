import Amtrak from './AmtrakAPI';
import React from 'react';

function TrainList(){
    // simple component just to test stuff
    function MakeTrain({
        train = new Amtrak.Train()
    }){
        var lastAt = ""
        if (train.stations[train.lastVisitedStation]){
            lastAt = ", last at " + train.stations[train.lastVisitedStation].stationCode;
        }
        return (
            <div className = 'train'>
                <h2>{train.routeName} #{train.number}</h2>
                <p>{train.from} to {train.to}{lastAt}</p>
            </div>
        )
    } // end MakeTrain

    const [trainList, setTrainList] = React.useState([]);
    const trainData = new Amtrak.APIInstance();

    // use once pattern
    React.useEffect(() => {
        trainData.onUpdated = function() {
            setTrainList(this.trains);
        }
        trainData.update();
    },[])
    
    console.log(trainList);
    
    if (trainList.length != 0){
        return (
            <div>
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

} // end TrainList

export default TrainList;