import { FaLocationDot } from "react-icons/fa6";
import { Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";


/**
 * Component displaying user location icon.
 * @component
 * @returns {JSX.Element} The user location icon component.
 */
const UserLocationIcon = () => (
    <div className="custom-icon-container" style={{ color: "red" }}>
        <FaLocationDot size={20} />
    </div>
);

/**
 * Component displaying user location on map.
 * @component
 * @module UserLocationMarker
 * @param {object} userLocation - The object representing the user location.
 * @returns {JSX.Element} The user location marker component.
 */
const UserLocationMarker = ({userLocation}) => {
    if (userLocation){
        return (
            <Marker
                key={'userLocation'}
                position={[userLocation.coords.latitude, userLocation.coords.longitude]}
                icon={L.divIcon({
                    html: renderToString(<UserLocationIcon />),
                    className: 'custom-icon',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })}>

                <Popup>
                    <p>Your location.</p>
                </Popup>
            </Marker>)
    }
}
export default UserLocationMarker;