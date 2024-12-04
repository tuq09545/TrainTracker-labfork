import './styles/MapPage.css';
import React from 'react'
import Search from './Search';
import TrainMap from './Map/TrainMap';

import {convertStationCodeToStation} from './functionality/app';

/**
 * Component displaying map page.
 * @component
 * @module MapPage
 * @param {object[]} allRoutes - The list of objects representing all available Amtrak routes.
 * @param {object[]} allStations - The list of objects representing all available Amtrak stations.
 * @param {object} userLocation - The object representing the user's location.
 * @param {function} setRefresh - The function allowing app-wide toggling of refresh state.
 * @param {object[]} currentTrains - The list of objects representing trains matching the current search criteria.
 * @param {object} globalSearchObject - The state object containing app-wide searching criteria.
 * @param {function} setGlobalSearchObject - The setter function for the state object containing app-wide searching criteria.
 * @returns {JSX.Element} The map page component.
 */
function MapPage({allRoutes, allStations, userLocation, setRefresh, currentTrains, globalSearchObject, setGlobalSearchObject
}){

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


    return (
        <div className='map-page'>
            <div className='search-container'>
              <Search className='Search'
                routes = {getRouteOptions()}
                stations = {getStationOptions()}
                setRefreshState={setRefresh}
                globalSearchObject = {globalSearchObject}
                setGlobalSearchObject = {setGlobalSearchObject}
              />
              </div>
              <div className='map-container'>
              <TrainMap
                trains={currentTrains}
                userLocation={userLocation}
                selectedStation={convertStationCodeToStation(allStations, globalSearchObject.station)}
                selectedFromStation={convertStationCodeToStation(allStations, globalSearchObject.fromStation)}
                selectedToStation={convertStationCodeToStation(allStations, globalSearchObject.toStation)}
                selectedRoute={globalSearchObject.route}
            />
              </div>
        </div>
    )
}
export default MapPage;