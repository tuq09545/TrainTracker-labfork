import { IoTrainOutline } from "react-icons/io5";
import { Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";


/**
 * Component displaying train icon.
 * @component
 * @memberOf module:TrainMarkers
 * @returns {JSX.Element} The train icon component.
 */
const TrainIcon = () => (
    <div className="custom-icon-container" style={{ color: "blue" }}>
        <IoTrainOutline size={20} />
    </div>
);

/**
 * Component displaying train markers on map.
 * @component
 * @module TrainMarkers
 * @param {object[]} trains - The list of train objects to display.
 * @returns {JSX.Element} The train markers.
 */
const TrainMarkers = ({trains}) => { 
    if(trains.length !== 0){
        return(
            <div>
                {trains.map((train,index) =>
                    <Marker
                        key={index}
                        position={[train.lat, train.lon]}
                        icon={L.divIcon({
                            html: renderToString(<TrainIcon />),
                            className: 'custom-icon',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15]
                        })}
                    >
                        <Popup>
                            <strong>{train.routeName}</strong> - Train #{train.number}
                            <br />
                            Departed from: {train.from}
                            <br />
                            En Route to: {train.to}
                            <br />
                            Speed: {Math.round(train.speed)} mph
                            <br />
                            Punctuality: {train.punctuality}
                            <br />
                            Last update: {new Date(train.lastUpdate).toLocaleString()}
                        </Popup>
                    </Marker>
                )}
            </div>
        )
    } else {
        return <div></div>;
    }   
}
export default TrainMarkers;