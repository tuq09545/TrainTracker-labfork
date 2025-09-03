import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import { Routes, Route, HashRouter, Link } from 'react-router-dom';

import Home from './Home';
import MapPage from './MapPage';
import TrainPage from './TrainPage';
import { SearchObject } from './Search';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoTrainOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

import { filterTrains } from './functionality/app';

/**
 * Component displaying the entire app.
 * It renders the main components of the app using React Router.
 * It renders 3 different pages in the form of components: Home, MapPage, and TrainPage.
 * It also includes a sidebar/ nav bar on mobile.
 * @component
 * @module App
 * @returns {JSX.Element} The app component.
 */
function App() {
    const api = new Amtrak.APIInstance();
    const [refreshState, setRefreshState] = useState(false);
    const [refreshPopup, setRefreshPopup] = useState(false);

    const [userLocation, setUserLocation] = useState(null);

    const [searchObject,setSearchObject] = useState(new SearchObject());

    const [allTrains, setAllTrains] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const [currentTrains, setCurrentTrains] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const searchTrains = () => {
        let trains = filterTrains(allTrains, searchObject);
        setCurrentTrains(trains);
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
        

    useEffect(() => {
        searchTrains();
    },[searchObject]);

    // wait for allTrains to load & then make search
    if(isLoading){
        if(allTrains.length > 0){
            searchTrains();
            setIsLoading(false);
        }
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        api.onUpdated = function () {
            setAllTrains(this.trains);
            setAllRoutes(this.routes);
            setAllStations(this.stations);
        }
        api.update();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                    setUserLocation(pos);
                    /* not used, but keeping in case we want to reintroduce it
                    if (allStations.length > 0 && pos) {
                        setSearchObject(setProp(searchObject,"station",getClosestStation(allStations, pos).stationCode));
                    }*/
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

    const HomePage = () => ( <Home
        allRoutes={allRoutes}
        allStations={allStations}
        setRefresh={setRefreshState}
        currentTrains={currentTrains}
        globalSearchObject={searchObject}
        setGlobalSearchObject={setSearchObject}
    />);

    const MapPageComponent = () => ( <MapPage
        userLocation={userLocation}
        allRoutes={allRoutes}
        allStations={allStations}
        setRefresh={setRefreshState}
        currentTrains={currentTrains}
        globalSearchObject={searchObject}
        setGlobalSearchObject={setSearchObject}
    />);

    return (
        <HashRouter>
            <div className={`App ${!isDarkMode ? 'light-theme' : ''}`}>
                {refreshPopup && <div className="refresh-popup">Refreshed</div>}
                {isMobile ? (
                    <div className="topbar">
                        <Link to="/home" className="nav-icon-link"><IoHomeOutline size={30} /></Link>
                        <Link to="/map" className="nav-icon-link"><FaMapLocationDot size={30} /></Link>
                        <Link to="/trains/all" className="nav-icon-link"><IoTrainOutline size={30} /></Link>
                        <button className="nav-icon-link theme-toggle" onClick={toggleTheme}>
                            {isDarkMode ? <IoSunnyOutline size={30} /> : <IoMoonOutline size={30} />}
                        </button>
                    </div>
                ) : (
                    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="mySidebar">
                        <div className="sidebar-header">
                            <img src={train_icon} alt="Train Icon" className="train_icon" />
                            {sidebarOpen && (
                                <h2 className="sidebar-heading">TrainTracker</h2>
                            )}
                        </div>
                        <button className="openbtn" onClick={toggleSidebar}>
                            {sidebarOpen ? (
                                <IoIosArrowDropleft size={30} />
                            ) : (
                                <IoIosArrowDropright size={30} />
                            )}
                        </button>
                        {sidebarOpen ? (
                            <div className="nav">
                                <Link to="/home" className="nav-link">Home</Link>
                                <Link to="/map" className="nav-link">Map</Link>
                                <Link to="/trains/all" className="nav-link">Trains</Link>
                                <button className="nav-link theme-toggle" onClick={toggleTheme}>
                                    {isDarkMode ? <IoSunnyOutline size={30} /> : <IoMoonOutline size={30} />}
                                    {sidebarOpen && <span style={{marginLeft: '10px'}}>{isDarkMode ? 'Light' : 'Dark'}</span>}
                                </button>
                            </div>
                        ) : (
                            <div className="nav-icons">
                                <Link to="/home" className="nav-icon-link">
                                    <IoHomeOutline size={30} />
                                </Link>
                                <Link to="/map" className="nav-icon-link">
                                    <FaMapLocationDot size={30} />
                                </Link>
                                <Link to="/trains/all" className="nav-icon-link">
                                    <IoTrainOutline size={30} />
                                </Link>
                                <button className="nav-icon-link theme-toggle" onClick={toggleTheme}>
                                    {isDarkMode ? <IoSunnyOutline size={30} /> : <IoMoonOutline size={30} />}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className={`content ${!sidebarOpen ? 'sidebar-closed' : 'sidebar-open'}`} id="main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/trains/:trainInfo" element={<TrainPage allTrains={allTrains} />} />
                        <Route path="/map" element={<MapPageComponent />} />
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}
export default App;
