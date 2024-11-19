import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import { Routes, Route, HashRouter, useNavigate } from 'react-router-dom';

import Home from './Home';
import TrainPage from './TrainPage';

import { getClosestStation } from './functionality/app';

function App() {
    // load api data
    const api = new Amtrak.APIInstance();
    const [refreshState, setRefreshState] = useState(false);
    const [refreshPopup, setRefreshPopup] = useState(false);

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

    useEffect(() => {
        if (refreshState) {
            const newApi = new Amtrak.APIInstance();
            newApi.onUpdated = function() {
                setAllTrains(this.trains);
            }
            newApi.update();
            setRefreshState(false);
            setRefreshPopup(true);
            setTimeout(() => setRefreshPopup(false), 3000); // Hide popup after 3 seconds
            
        }
    }, [refreshState]);
  
    const HomePage = <Home
        allTrains={allTrains}
        allRoutes={allRoutes}
        allStations={allStations}
        userLocation={userLocation}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        refresh={refreshState}
        setRefresh={setRefreshState}
    />;
    
  return (
    <HashRouter>
        <div className="App">
            {refreshPopup && <div className="refresh-popup">Refreshed</div>}
            <div className="header">
                <div className="heading-box">
                    <img src={train_icon} alt="Train Icon" className="train_icon" />
                    <h1>TrainTracker</h1>
                </div>
          </div>
              
          <div className='content'>
                <Routes>
                    <Route path="/" element={HomePage}/>
                    <Route path="/home" element={HomePage}/>
                    <Route path="/train/:trainInfo" element={<TrainPage allTrains={allTrains}/>}/>

                </Routes>
              </div> 
          </div>
    </HashRouter>
  );
}

export default App;
