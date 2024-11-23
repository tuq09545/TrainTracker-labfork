import './styles/MapPage.css';
import React, {useState, useMemo} from 'react'
import TrainList from './TrainList';
import Search from './Search';
import TrainPopup from './TrainPopup';
import TrainMap from './TrainMap';

import {filterTrains} from './functionality/app.js'
import {convertStationCodeToStation} from './functionality/app';


import { IoClose } from "react-icons/io5";

function MapPage({allTrains, allRoutes, allStations, userLocation, selectedStation, setSelectedStation, selectedRoute, setSelectedRoute, refresh, setRefresh}){
    // sorted trains
    const [currentTrains, setCurrentTrains] = useState([]);
    // popup modal
    const [selectedTrain, setSelectedTrain] = useState({});
    const [showModal, setShowModal] = useState(false);

    const searchTrains = (selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation) => {
        let trains = filterTrains(allTrains, selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation);

        setCurrentTrains(trains);
    }

    const filteredTrains = useMemo(() => {
        return filterTrains(allTrains, selectedStation, selectedRoute, null, null, null, null);
    }, [allTrains, selectedStation, selectedRoute]);

    // If no search has been made, default to the filtered trains
    const trainsToDisplay = currentTrains.length > 0 ? currentTrains : filteredTrains;


    const getStationOptions = () => {
        let renderedStations = allStations.map(station => {
            return <option value={station.stationCode} key={station.stationCode}>{station.stationCode} - {station.name}</option>
        })
        renderedStations.unshift(<option value={""} key={""}>{}</option>);
        return renderedStations;
    }

    const getRouteOptions = () => {
        let renderedRoutes = allRoutes.sort((a, b) => (a.Name).localeCompare(b.Name)).map(route => {
            return <option value={route.Name} key={route.Name}>{route.Name}</option>
        });
        renderedRoutes.unshift(<option value={""} key={""}></option>);
        return renderedRoutes;
    }

    // Modal Functions
    function handleTrainClick(train){
        setShowModal(true);
        setSelectedTrain(train);
    }

    const handleModalClose = () => {
        setShowModal(false);
    };

    const closeButton = (<div>
        <div onClick={handleModalClose} className='close-button'><IoClose size={'3rem'}/></div>
    </div>);

    const modal = <TrainPopup onClose={handleModalClose} actionBar={closeButton} train={selectedTrain}/>
    return (
        <div className='map-page'>
            <div className='search-container'>
              <Search className='Search'
                routes = {getRouteOptions()}
                stations = {getStationOptions()}
                searchFun = {searchTrains}
                setSelectedStation={setSelectedStation}
                selectedStation={selectedStation}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
                refreshState={refresh}
                setRefreshState={setRefresh}
              />
              </div>
              <div className='map-container'>
              <TrainMap
                trains={allTrains}
                userLocation={userLocation}
                selectedStation={convertStationCodeToStation(allStations, selectedStation)}
                selectedRoute={selectedRoute}
            />
              </div>
              <div>
                {showModal && modal}
              </div>
        </div>
    )
}

export default React.memo(MapPage);