import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import { Routes, Route, HashRouter, Link, useNavigate } from 'react-router-dom';

import Home from './Home';
import TrainPage from './TrainPage';
import TrainMap from './TrainMap';

import {convertStationCodeToStation, getClosestStation} from './functionality/app';

function App() {
    // load api data
    const api = new Amtrak.APIInstance();

    const [userLocation, setUserLocation] = useState(null);
    const [selectedStation, setSelectedStation] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");

    const [allTrains, setAllTrains] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        api.onUpdated = function() {
            setAllTrains(this.trains);
            setAllRoutes(this.routes);
            setAllStations(this.stations);
        }
        api.update();

    },[]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                setUserLocation(pos);
                if (allStations.length > 0 && pos){
                    setSelectedStation(getClosestStation(allStations, pos).stationCode);
                }
            }, 
            (error) => console.log('error' + error));
        }
        
    }, [allStations]);
  
    const HomePage = <Home
        allTrains={allTrains}
        allRoutes={allRoutes}
        allStations={allStations}
        userLocation={userLocation}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
    />;

    const MapPage = <TrainMap
        trains={allTrains}
        userLocation={userLocation}
        selectedStation={convertStationCodeToStation(allStations, selectedStation)}
        selectedRoute={selectedRoute}
        />;

  return (
    <HashRouter>
        <div className="App">
          <div className="header">
                <div className="heading-box">
                    <img src={train_icon} alt="Train Icon" className="train_icon" />
                    <h1>TrainTracker</h1>
                </div>
          </div>
              
          <div className='content'>
              <div className="sidebar">
                  <ul className="nav">
                      <li>
                          <Link to="/home">Home</Link>
                      </li>
                      <li>
                          <Link to="/train">Trains</Link>
                      </li>
                      <li>
                          <Link to="/map">Map</Link>
                      </li>
                  </ul>
              </div>

                <Routes>
                    <Route path="/" element={HomePage}/>
                    <Route path="/home" element={HomePage}/>
                    <Route path="/train/:trainInfo" element={<TrainPage allTrains={allTrains}/>}/>
                    <Route path="/map" element={MapPage}/>
                </Routes>
              </div> 
          </div>
    </HashRouter>
  );
}

export default App;
