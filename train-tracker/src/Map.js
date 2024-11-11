import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Map = () => {
    const [railLines, setRailLines] = useState(null);
    const [stations, setStations] = useState(null);

    useEffect(() => {
        // Fetch rail lines GeoJSON
        fetch("/geojson/amtrak-track.geojson")
            .then(response => response.json())
            .then(data => setRailLines(data));

        // Fetch stations GeoJSON
        fetch("/geojson/amtrak-stations.geojson")
            .then(response => response.json())
            .then(data => setStations(data));
        // Recalculate map size when window is resized
        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();  // Forces Leaflet to recalculate map size
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup resize listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const mapRef = React.createRef();

    return (
        <MapContainer
            ref={mapRef}
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ width: "100%", height: "100%" }} // Take full width and height of the container
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[39.9815, -75.1553]}>
                <Popup>Welcome to Temple University. We're working on the Train Tracker!</Popup>
            </Marker>
            {railLines && (
                <GeoJSON data={railLines} style={{ color: "blue", weight: 1 }} />
            )}
            {stations && (
                <GeoJSON
                    data={stations}
                    pointToLayer={(feature, latlng) =>
                        L.circleMarker(latlng, { radius: 1.5, color: "red" })
                    }
                />
            )}
        </MapContainer>
    );
};

export default Map;
