import { FaBuildingUser } from "react-icons/fa6";
import { Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";

/**
 * Component displaying station icon.
 * @component
 * @module SelectedStationMarker
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
const SelectedStationMarker = ({selectedStation}) =>{
    if (selectedStation){
        return (
            <Marker
                key={'selectedStation'}
                position={[selectedStation.lat, selectedStation.lon]}
                icon={L.divIcon({
                    html: renderToString(<SelectedStationIcon />),
                    className: 'custom-icon',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })}>

                <Popup>
                    <strong>Selected Station</strong>
                    <p>{selectedStation.stationCode} - {selectedStation.stationName ? selectedStation.stationName : selectedStation.name}</p>
                </Popup>
            </Marker>)
    }
}
export default SelectedStationMarker;