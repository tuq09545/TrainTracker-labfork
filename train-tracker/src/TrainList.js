import React from 'react';
import './styles/TrainList.css';

function TrainList({trains, handleTrainClick}){

    function MakeTrain({train}){
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

        const handleClick = () => {
            handleTrainClick(train);
        }

        return (
            <div className = 'spacing' onClick={handleClick}>
                <div className = 'train'>
                    <h2>#{train.number} {train.routeName}{dir} </h2>
                    <p>
                        {train.from} to {train.to}{lastAt}{status}
                    </p>
                </div>
            </div>
            
        )
    } 
    
    if (trains.length != 0){
        return (
            <div className = 'trainList'>
                {
                    trains.map(t =>
                        <MakeTrain train = {t} key={`${t.heading} ${t.number} ${t.lastVisitedStation}`}/>
                    )
                }
            </div>
        )
    }
    else{
        return (
            <div>
                <h1>No results.</h1>
            </div>
        )
    }

}

export default TrainList;