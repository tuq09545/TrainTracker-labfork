import { FaLocationDot } from "react-icons/fa6";
import { Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const UserLocationIcon = () => (
    <div className="custom-icon-container" style={{ color: "red" }}>
        <FaLocationDot size={20} />
    </div>
);

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