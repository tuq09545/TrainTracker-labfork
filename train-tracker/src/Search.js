import './styles/Search.css';
import { useState, useEffect } from 'react'

import { IoSearch } from "react-icons/io5";
import { MdClear, MdRefresh, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getLocalCache, setRouteToCache, isFavorited, removeRouteFromCache } from './functionality/LocalCache';

/** Class representing a search object, which contains search criteria. */
export class SearchObject {
    /**
     * Create a search object.
     * @param {string} number - The value for train number.
     * @param {string} route - The value for route.
     * @param {string} station - The value for station.
     * @param {boolean} upcoming - If the station search should only select trains that have not yet arrived at the station.
     * @param {string} fromStation - The departure station.
     * @param {string} toStation - The arrival station.
     * @param {string} date - The departure date of the train.
     */
    constructor() {
        this.number = "";
        this.route = "";
        this.station = "";
        this.upcoming = false;
        this.fromStation = "";
        this.toStation = "";
        this.date = "";
    }
}

/**
 * Component allowing searching of trains.
 * @component
 * @module Search
 * @param {object[]} routes - The list of all Amtrak routes available.
 * @param {object[]} stations - The list of all Amtrak stations available.
 * @param {function} setRefreshState - The function that toggles refresh state for the app.
 * @param {object} globalSearchObject - The state object containing app-wide searching criteria.
 * @param {function} setGlobalSearchObject - The setter function for the state object containing app-wide searching criteria.
 * @returns {JSX.Element} The search component.
 */
function Search({routes, stations, setRefreshState, globalSearchObject, setGlobalSearchObject
}){
    const [searchObject,setSearchObject] = useState(new SearchObject());
    const [currentRouteFavorited, setCurrentRouteFavorited] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    // update local search object when global search is changed
    useEffect(() => {
        setSearchObject(globalSearchObject);
    },[globalSearchObject]);

    useEffect(() => {
        // update favorite button
        if(isFavorited(searchObject.route)){
            setCurrentRouteFavorited(true);
        } else {
            setCurrentRouteFavorited(false);
        }
    },[searchObject.route]);

    const nonFavoriteIcon = <MdFavoriteBorder style={{color:'black'}}/>;
    const favoriteIcon = <MdFavorite style={{color:'red'}}/>;
    
    function handleFavoriteSelection(e){
        if (e.target.value !== "---"){
            setSearchObject({...searchObject, "route": e.target.value})
        }   
    }

    function setToFavorites(){
        if(currentRouteFavorited){
            let res = removeRouteFromCache(searchObject.route)
            if(res===0){
                setCurrentRouteFavorited(false);
            }
        } else {
            let res = setRouteToCache(searchObject.route);
            if(res===0){
                setCurrentRouteFavorited(true);
            }
        }
    }

    const favoriteOptions = () => {
        let favNames = ["---"]
        const cachedTrains = getLocalCache();
        Object.keys(cachedTrains.data).forEach(trainName => {
            favNames.push(trainName)
        });
        const mapping = favNames.map((element, index) => {
            return <option value={element} key={index}>{element}</option>})
        return mapping;
    }

    // search just sets global 
    const search = (event) =>{
        event.preventDefault();
        setGlobalSearchObject(searchObject);
        
        // Add to search history
        const searchString = `${searchObject.route || searchObject.number || searchObject.station || 'All Trains'}`;
        if (searchString && !searchHistory.includes(searchString)) {
            const newHistory = [searchString, ...searchHistory.slice(0, 4)]; // Keep last 5 searches
            setSearchHistory(newHistory);
        }
    }

    const clear = () => {
        setGlobalSearchObject(new SearchObject());
    }

    const refresh = () => {
        setRefreshState(true);
    }

    return (
        <form className='form' onSubmit={search}>
                <label className="select-label">
                        <span className="select-label">
                        Favorites:
                        <select className="select-box" onClick={handleFavoriteSelection}>{favoriteOptions()}</select>
                        </span>
                    </label>

                {searchHistory.length > 0 && (
                    <label className="select-label">
                        <span className="select-label">
                        Recent Searches:
                        <select className="select-box" onChange={(e) => {
                            if (e.target.value !== "---") {
                                setSearchObject({...searchObject, "route": e.target.value});
                            }
                        }}>
                            <option value="---">---</option>
                            {searchHistory.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        </span>
                    </label>
                )}

                <div className='top-label'>
                    Search Options: 
                </div>
                <span className="select-label">
                        Number:
                        <input className="select-box" value={searchObject.number} type="number" min='1' onChange=
                            // onChange: set local search object to a copy of itself with the property changed
                            {e => setSearchObject({...searchObject, "number": e.target.value})}
                        />
                    </span>
                <span className="select-label">
                        Route:
                        <select className="select-box" value={searchObject.route} children={routes} onChange=
                            {e => setSearchObject({...searchObject, "route": e.target.value})}
                        />
                        <div onClick={setToFavorites} className='form-button' style={{border:'none'}}>{currentRouteFavorited ? favoriteIcon : nonFavoriteIcon}</div>
                    </span>
                <span className="select-label">
                        Station:
                        <select className='select-box' value={searchObject.station} children={stations} onChange=
                            {e => setSearchObject({...searchObject, "station": e.target.value})}
                        />
                    </span>
                <span className="select-label">
                        Upcoming trains only: 
                        <input checked={searchObject.upcoming} type="checkbox" onChange=
                            {e => setSearchObject({...searchObject, "upcoming": e.target.checked})}
                        />
                    </span>

                <span className="select-label">
                        To:
                        <select className="select-box" value={searchObject.toStation} children={stations} onChange=
                            {e => setSearchObject({...searchObject, "toStation": e.target.value})}
                        />
                    </span>
                
                <span className="select-label">
                        From:
                        <select className="select-box" value={searchObject.fromStation} children={stations} onChange=
                            {e => setSearchObject({...searchObject, "fromStation": e.target.value})}
                        />
                    </span>

                <span className='button-container'>
                    <div onClick={search} className='form-button'>Search <IoSearch/></div>
                    <div onClick={clear} className='form-button'>Clear <MdClear/></div>
                    <div onClick={refresh} className='form-button'>Refresh <MdRefresh/></div>
                </span>
              </form>
    );
    
}
export default Search;