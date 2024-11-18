import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import { Link, Routes, Route, HashRouter } from 'react-router-dom';

import Home from './Home';
import TrainPage, {TrainForm} from './TrainPage';

function App() {
    // load api data
    const api = new Amtrak.APIInstance();

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

    const HomePage = <Home
            allTrains={allTrains}
            allRoutes={allRoutes}
            allStations={allStations}
        />
    
  return (
    <HashRouter>
        <div className="App">
          <div className="header">
              <Link to="/">
                <div className="heading-box">
                    <img src={train_icon} alt="Train Icon" className="train_icon" />
                    <h1>TrainTracker</h1>
                </div>
              </Link>
              
              <TrainForm/>
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
