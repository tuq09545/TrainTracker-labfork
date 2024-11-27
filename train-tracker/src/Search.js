import './styles/Search.css';
import {useState} from 'react'

import { IoSearch } from "react-icons/io5";
import { MdClear, MdRefresh, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getLocalCache, setRouteToCache, isFavorited, removeRouteFromCache } from './LocalCache';

export function SearchObject(){
    this.number = "";
    this.route = "";
    this.station = "";
    this.upcoming = false;
    this.fromStation = "";
    this.toStation = "";
    this.date = "";
}

function Search({searchFun, routes, stations, setRefreshState, searchObject, setSearchObject
}){

    const [selectedStation, setSelectedStation] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [upcoming, setUpcoming] = useState(false);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [currentRouteFavorited, setCurrentRouteFavorited] = useState(false);

    // react doesn't recognize just changing an object property
    // so we need to set it to a copy w/ the prop changed
    function setProp(searchObj,prop,value){
        var r = Object.assign({},searchObj)
        r[prop] = value;
        return r;
    }

    function handleNumber(e){ setSelectedNumber(e.target.value); }
    function handleRoute(e){
        setSelectedRoute(e.target.value);
        if (isFavorited(e.target.value)){
            console.log(e.target.value);
            setCurrentRouteFavorited(true);
        }
        else{
            setCurrentRouteFavorited(false);
        }
    }
    function handleStation(e){ setSelectedStation(e.target.value)}
    function handleUpcoming(e){ setUpcoming(e.target.checked); }
    function handleFromStation(e){ setFromStation(e.target.value); }
    function handleToStation(e){ setToStation(e.target.value); }

    const nonFavoriteIcon = <MdFavoriteBorder style={{color:'black'}}/>;
    const favoriteIcon = <MdFavorite style={{color:'red'}}/>;
    
    function handleFavoriteSelection(e){
        if (e.target.value !== "---"){
            setSelectedRoute(e.target.value);
            setCurrentRouteFavorited(true);
        }   
    }

    function setToFavorites(){
        if(currentRouteFavorited){
            let res = removeRouteFromCache(selectedRoute)
            if(res===0){
                setCurrentRouteFavorited(false);
            }
        } else {
            let res = setRouteToCache(selectedRoute);
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

    const search = (event) =>{
        event.preventDefault();
        searchFun();
    }

    const clearSearch = () => {
        setSelectedNumber("");
        setSelectedRoute("");
        setSelectedStation("");
        setUpcoming(false);
        setFromStation("");
        setToStation("");
    }

    const refresh = () => {
        setRefreshState(true);
    }

    return (

        <form className='form' onSubmit={search}>
                <label className="favorites-dropdown-selection">
                    <span className="select-label">
                    Favorites:
                    <select className="favorites-dropdown" onClick={handleFavoriteSelection}>{favoriteOptions()}</select>
                    </span>
                </label>

                <div className='top-label'>
                    Search options: 
                </div>
                <span className="select-label">
                        Train Number:
                        <input className="select-box" value={searchObject.number} type="number" min='1' onChange=
                            {e => setSearchObject(setProp(searchObject,"number",e.target.value))}
                        />
                    </span>
                <span className="select-label">
                        Route:
                        <select className="select-box" value={selectedRoute} onChange={handleRoute} children={routes}></select>
                        <div onClick={setToFavorites} className='form-button' style={{border:'none'}}>{currentRouteFavorited ? favoriteIcon : nonFavoriteIcon}</div>
                    </span>
                <span className="select-label">By station: </span>
                    <select className='select-box' value={selectedStation} onChange={handleStation} children={stations}></select>
                    <span className="select-label">
                        Upcoming trains only: 
                        <input checked={upcoming} onChange={handleUpcoming} type="checkbox" ></input>
                    </span>
               
                <label className="optional-criteria-label">
                    Optional criteria:
                    <span className="select-label">
                        From:
                        <select className="select-box" value={fromStation} onChange={handleFromStation} children={stations}></select>
                    </span>
                    <span className="select-label">
                        To:
                        <select className="select-box" value={toStation} onChange={handleToStation} children={stations}></select>
                    </span>
                </label>

                <span className='button-container'>
                    <div onClick={search} className='form-button'>Search <IoSearch/></div>
                    <div onClick={clearSearch} className='form-button'>Clear <MdClear/></div>
                    
                    <div onClick={refresh} className='form-button'>Refresh <MdRefresh/></div>
                </span>
              </form>
    );
    
}

export default Search;