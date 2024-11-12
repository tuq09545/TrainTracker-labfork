import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { APIInstance } from "./AmtrakAPI";
import L from "leaflet";
import { IoTrainOutline } from "react-icons/io5";
import { renderToString } from "react-dom/server";
import './styles/Map.css';

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
    const [trains, setTrains] = useState([]);
    const apiInstance = useRef(new APIInstance());
    const mapRef = useRef();

    useEffect(() => {
        fetch("/geojson/amtrak-track.geojson")
            .then(response => response.json())
            .then(data => setRailLines(data));

        fetch("/geojson/amtrak-stations.geojson")
            .then(response => response.json())
            .then(data => setStations(data));

        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const updateTrainData = () => {
        apiInstance.current.update();
        setTrains(apiInstance.current.trains || []);
    };

    useEffect(() => {
        apiInstance.current.onUpdated = updateTrainData;
        updateTrainData();
        const intervalId = setInterval(updateTrainData, 60000);

        return () => clearInterval(intervalId);
    }, []);


    const trainIconHTML = renderToString(
        <div className="custom-icon-container">
            <IoTrainOutline size={20} color="#000" />
        </div>
    );

    const trainIcon = new L.DivIcon({
        html: trainIconHTML,
        className: "custom-div-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    return (
        <MapContainer
            ref={mapRef}
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ width: "100%", height: "100%" }}
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
                        L.circleMarker(latlng, { radius: 1, color: "red" })
                    }
                />
            )}
            {trains.map((train, index) => (
                <Marker
                    key={index}
                    position={[train.lat, train.lon]}
                    icon={trainIcon}
                >
                    <Popup>
                        <strong>{train.routeName}</strong> - Train #{train.number}
                        <br />
                        Speed: {Math.round(train.speed)} mph
                        <br />
                        Punctuality: {train.punctuality}
                        <br />
                        Last update: {new Date(train.lastUpdate).toLocaleString()}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
