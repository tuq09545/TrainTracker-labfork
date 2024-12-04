import { FaBuildingUser } from "react-icons/fa6";
import { Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";

/**
 * Component displaying station icon.
 * @component
 * @memberOf module:SelectedStationMarker
 * @returns {JSX.Element} The selected station icon component.
 */
const SelectedStationIcon = () => (
    <div className="custom-icon-container" style={{ color: "black" }}>
        <FaBuildingUser size={20} />
    </div>
);

/**
 * Component displaying station on map.
 * @component
 * @module SelectedStationMarker
 * @param {object} selectedStation - The object representing the currently selected station.
 * @returns {JSX.Element} The selected station component.
 */
const SelectedStationMarker = ({station, name}) =>{
    if (station){
        return (
            <Marker
                key={'selectedStation'+station.stationCode}
                position={[station.lat, station.lon]}
                icon={L.divIcon({
                    html: renderToString(<SelectedStationIcon />),
                    className: 'custom-icon',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })}>

                <Popup>
                    <strong>{name} Station</strong>
                    <p>{station.stationCode} - {station.stationName ? station.stationName : station.name}</p>
                </Popup>
            </Marker>)
    }
}
export default SelectedStationMarker;