import './styles/Home.css';
import React, {useState, useMemo} from 'react'
import TrainList from './TrainList';
import Search from './Search';
import TrainPopup from './TrainPopup';
//import Favorites from './favorites.js';

import {filterTrains} from './functionality/app.js'

import { IoClose } from "react-icons/io5";

function Home({allTrains, allRoutes, allStations, userLocation, selectedStation, setSelectedStation, selectedRoute, setSelectedRoute}){
    //sorted trains
    const [currentTrains, setCurrentTrains] = useState([]);
    // popup modal
    const [selectedTrain, setSelectedTrain] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showDefaultList, setDefaultList] = useState(true);

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

    function handleFavoriteClick(e){
        setDefaultList(false)
        searchTrains("", e.props.value, "", "", "", "")
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

    // let trainListElementDefault = <Favorites handleFavoriteClick={handleFavoriteClick}/>

    // let trainListElement = <TrainList className = 'TrainList' 
    // trains={trainsToDisplay} 
    // handleTrainClick={handleTrainClick}/>

    const modal = <TrainPopup onClose={handleModalClose} actionBar={closeButton} train={selectedTrain}/>
    return (
        <div className='home-page'>
            <div className='search-container'>
              <Search className='Search'
                routes = {getRouteOptions()}
                stations = {getStationOptions()}
                searchFun = {searchTrains}
                setSelectedStation={setSelectedStation}
                selectedStation={selectedStation}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
              </div>
              <div className='app-train-list-container'>
                <TrainList className = 'TrainList' 
                    trains={trainsToDisplay}
                    handleTrainClick={handleTrainClick}
                />
              </div>
              <div>
                {showModal && modal}
              </div>
        </div>
    )
}

export default React.memo(Home);