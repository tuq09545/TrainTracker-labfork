import React from 'react';
import './styles/TrainList.css';

/**
 * Component displaying list of trains.
 * @component
 * @module TrainList
 * @param {object[]} trains - The list of train objects to display.
 * @param {function} handleTrainClick - The train click handler, which opens an app-wide popup.
 * @returns {JSX.Element} The train list component.
 */
function TrainList({trains, handleTrainClick}){

    function TrainRow({train}){
        const status = train.punctuality?.replace('MI', 'min.').replace('HR', 'hr.').toLowerCase();

        // Determine status badge class
        let statusBadgeClass = 'status-ontime';
        if (train.punctuality?.includes('LATE')) {
            statusBadgeClass = 'status-late';
        } else if (train.punctuality?.includes('EARLY')) {
            statusBadgeClass = 'status-early';
        } else if (train.punctuality?.includes('DELAYED')) {
            statusBadgeClass = 'status-delayed';
        } else if (train.punctuality?.includes('CANCELLED')) {
            statusBadgeClass = 'status-cancelled';
        }

        const handleClick = () => {
            handleTrainClick(train);
        }

        return (
            <tr onClick={handleClick} className="train-row">
                <td>#{train.number}</td>
                <td>{train.routeName}</td>
                <td>{train.from}</td>
                <td>{train.to}</td>
                <td>
                    <span className={`status-badge ${statusBadgeClass}`}>
                        {status}
                    </span>
                </td>
                <td>
                    <span className="speed-display">
                        {train.speed ? `${Math.round(train.speed)} mph` : 'N/A'}
                    </span>
                </td>
            </tr>
        );
    }

    if (trains.length !== 0){
        return (
            <div className="train-list-container">
                <table className="train-list">
                    <thead>
                        <tr>
                            <th>Train Number</th>
                            <th>Line Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trains.map(t =>
                            <TrainRow train={t} 
                            key={`${t.heading} ${t.number} ${t.lastVisitedStation}`}/>
                        )}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <table className="train-list">
                <thead>
                        <tr>
                            <th>Train Number</th>
                            <th>Line Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </table>
                <h3>Oops! It looks like we couldn't find the train you were looking for &#128647;</h3>
            </div>
        )
    }
}
export default TrainList;