import './styles/MapPage.css';
import React from 'react'
import Search from './Search';
import TrainMap from './TrainMap';

import {convertStationCodeToStation} from './functionality/app';

function MapPage({allRoutes, allStations, userLocation, selectedStation, setSelectedStation, selectedRoute, setSelectedRoute, refresh, setRefresh,
    selectedNumber, setSelectedNumber, upcoming, setUpcoming, fromStation, setFromStation, toStation, setToStation, currentTrains, searchTrains
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
                searchFun = {searchTrains}
                setSelectedStation={setSelectedStation}
                selectedStation={selectedStation}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
                refreshState={refresh}
                setRefreshState={setRefresh}
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
                upcoming={upcoming} 
                setUpcoming={setUpcoming}
                fromStation={fromStation}
                setFromStation={setFromStation}
                toStation={toStation}
                setToStation={setToStation}
              />
              </div>
              <div className='map-container'>
              <TrainMap
                trains={currentTrains}
                userLocation={userLocation}
                selectedStation={convertStationCodeToStation(allStations, selectedStation)}
                selectedRoute={selectedRoute}
            />
              </div>
        </div>
    )
}

export default MapPage;