import './styles/TrainInfo.css';
import { isFavorited } from './LocalCache';
import {Link} from 'react-router-dom';
import { FaRegShareFromSquare } from "react-icons/fa6";

function TrainInfo({train}){

    const renderedStops = train.stations.map((s) => {
        let arrivalStyle = "";
        let departureStyle = "";
        

        if(!s.hasArrived) {
            arrivalStyle = s.arrivalPunctuality?.endsWith("LATE") ? "late" : "ontime";
        }
        if(!s.hasDeparted) {
            departureStyle = s.departurePunctuality?.endsWith("LATE") ? "late" : "ontime";
        }

        return <tr key={s.stationCode}>
                <td>{s.stationCode}</td>
                <td className={arrivalStyle}>{s.arrivalTime ? (s.hasArrived ? "" : "Estimated: ") + s.arrivalTime : ""}</td>
                <td className={departureStyle}>{s.departureTime ? ((s.hasDeparted) ? "" : "Estimated: ") + s.departureTime : ""}</td>
            </tr>
        })
    let punctualityClassName = train.punctuality === 'ON TIME' ? 'ontime' : 'late';
    let punctualityToDisplay = train.punctuality?.replace('MI', 'min.').replace('HR', 'hr.').toLowerCase();

    const trainLink =`/trains/${train.number}?date=${encodeURIComponent(train.scheduledDeparture)}`;
    
    const handleShareClick = () => {
        console.log(trainLink);
        console.log(window.location.origin);
        navigator.clipboard.writeText(`I'm on Amtrak train #${train.number}, route ${train.routeName} 🚆! #TrackMyTrain: ${window.location.origin}/TrainTracker#${trainLink}`);
    };

    let favorited = "";
    if(isFavorited(train.routeName)){
        favorited = <em>&#10003; Favorited</em>
    };

    return(
        <div className='train-info'>
            <h2 className='route'><Link to={trainLink} target="_blank">{train.routeName} (#{train.number})</Link></h2>
            <FaRegShareFromSquare onClick={handleShareClick}/>
            <h3 className='direction'>From: {train.from}</h3>
            <h3 className='direction'>To: {train.to}</h3>
            <div className={punctualityClassName} >{punctualityToDisplay}</div>
            <div>Last updated: {train.lastUpdate}</div>
            <div>{favorited}</div>
            <table className="train-table">
                <thead><tr><th>Station</th><th>Arrived</th><th>Departed</th></tr></thead>
                <tbody>{renderedStops}</tbody>
            </table>
        </div>
    )
}

export default TrainInfo;