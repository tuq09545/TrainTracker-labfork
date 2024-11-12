import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import Map from './Map';
import TrainList from './TrainList';
import Search from './Search';
import TrainPopup from './TrainPopup';
import {setToCache} from './LocalCache'

import { IoClose } from "react-icons/io5";

function App() {
    const api = new Amtrak.APIInstance();

    // api data
    const [allTrains, setAllTrains] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [allStations, setAllStations] = useState([]);

    // search
    const [selectedNumber, setSelectedNumber] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedStation, setSelectedStation] = useState("");
    const [upcoming, setUpcoming] = useState(false);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");

    // sorted trains
    const [currentTrains, setCurrentTrains] = useState([]);

    // popup modal
    const [selectedTrain, setSelectedTrain] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        api.onUpdated = function() {
            setAllTrains(this.trains);
            setAllRoutes(this.routes);
            setAllStations(this.stations);
        }
        api.update();
    },[]);

    // Search functions
    function handleNumber(e){ setSelectedNumber(e.target.value); }
    function handleRoute(e){ setSelectedRoute(e.target.value); }
    function handleStation(e){ setSelectedStation(e.target.value); }
    function handleUpcoming(e){ setUpcoming(e.target.checked); }
    function handleFromStation(e){ setFromStation(e.target.value); }
    function handleToStation(e){ setToStation(e.target.value); }

    function saveButton(){
        setToCache(searchKey)
    }

    const sortTrains = () => {
        let trains = allTrains;
        if (selectedNumber > 0){
            trains = trains.filter(t => t.number === selectedNumber)
        } if (selectedRoute){
            trains = trains.filter(t => t.routeName === selectedRoute)
        } if (selectedStation){
            trains = trains.filter((t,index) => (t.stations.findIndex((station) => station.stationCode === selectedStation) !== -1));
            if (upcoming){
                trains = trains.filter((t, index) => {
                    let station = t.stations.find((station) => station.stationCode === selectedStation);
                    if (station.stationCode === t.from && station.hasDeparted){
                        return;
                    }
                    if (!station.hasArrived || !station.hasDeparted){
                        return t;
                    }
                })
            }
        } if (fromStation && toStation){
            trains = trains.filter((t, index) =>{
                return t.stations.findIndex((station) => station.stationCode === fromStation) < t.stations.findIndex((station) => station.stationCode === toStation);
            })
        }
        // sort results by number
        trains.sort((a,b) => a.number - b.number);
        setCurrentTrains(trains);
    }

    const clearSearch = () => {
        setSelectedNumber("");
        setSelectedRoute("");
        setSelectedStation("");
        setUpcoming(false);
        setFromStation("");
        setToStation("");
    }

    const getStationOptions = () => {
        let stations = [];
        allStations.map(station => {
            stations.push(<option value={station.stationCode}>{station.stationCode} - {station.name}</option>)
        })
        stations.push(<option value={""} key={""}>{}</option>);
        return stations;
    }

    const getRouteOptions = () => {
        let routes = [];
        allRoutes.map(route => {
            routes.push(<option value={route.Name}>{route.Name}</option>)
        });
        routes.push(<option value={""} key={""}>{}</option>);
        return routes;
    }

    // Modal Functions
    function handleTrainClick(train){
        setShowModal(true);
        setSelectedTrain(train);
    }

    const handleModalClose = () => {
        setShowModal(false);
    };

    const actionBar = (<div>
        <div onClick={handleModalClose}><IoClose size={'3rem'}/></div>
    </div>);

    const modal = <TrainPopup onClose={handleModalClose} actionBar={actionBar} train={selectedTrain}/>

  return (
      <div className="App">
          <div className="header">
              <div className="heading-box">
                  <img src={train_icon} alt="Train Icon" className="train_icon" />
                  <h1>TrainTracker</h1>
              </div>
              <div className='content'>
              <div className='search-container'>
              <Search className='Search'
                number = {selectedNumber} setNumber = {handleNumber}
                route = {selectedRoute} setRoute = {handleRoute} routes = {getRouteOptions()}
                station = {selectedStation} setStation = {handleStation} stations = {getStationOptions()}
                upcoming = {upcoming} setUpcoming = {handleUpcoming}
                searchFun = {sortTrains} clearFun = {clearSearch}
                fromStation = {fromStation} setFromStation = {handleFromStation}
                toStation = {toStation} setToStation = {handleToStation}
                saveButton = {saveButton}
              />
              </div>
              <div className='app-train-list-container'><TrainList className = 'TrainList' trains={currentTrains} handleTrainClick={handleTrainClick}/></div>
              <div className='map-container'><Map className = 'Map' /></div>
              <div>
                {showModal && modal}
                </div>
              </div> 
          </div>
      </div>
  );
}

export default App;
