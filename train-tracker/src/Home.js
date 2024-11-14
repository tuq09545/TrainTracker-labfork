import './styles/Home.css';
import React, {useState, useEffect} from 'react'

import Map from './Map';
import TrainList from './TrainList';
import Search from './Search';
import TrainPopup from './TrainPopup';

import {filterTrains} from './functionality/app.js'

import { IoClose } from "react-icons/io5";

function Home({
    allTrains, allRoutes, allStations
}){
    // sorted trains
    const [currentTrains, setCurrentTrains] = useState([]);

    // popup modal
    const [selectedTrain, setSelectedTrain] = useState({});
    const [showModal, setShowModal] = useState(false);

    const searchTrains = (selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation) => {
        let trains = filterTrains(allTrains, selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation);

        setCurrentTrains(trains);
    }

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
        renderedRoutes.unshift(<option value={""} key={""}>All routes</option>);
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
        <div className='home-page'>
            <div className='search-container'>
              <Search className='Search'
                routes = {getRouteOptions()}
                stations = {getStationOptions()}
                searchFun = {searchTrains}
              />
              </div>
              <div className='app-train-list-container'>
                <TrainList className = 'TrainList' 
                    trains={currentTrains} 
                    handleTrainClick={handleTrainClick}
                />
              </div>
              <div className='map-container'>
                <Map className = 'Map' 
                    trains={currentTrains}
                />
              </div>
              <div>
                {showModal && modal}
              </div>
        </div>
    )
}

export default Home;