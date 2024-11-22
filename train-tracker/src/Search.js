import './styles/Search.css';
import {useState, useEffect} from 'react'

import { IoSearch } from "react-icons/io5";
import { MdClear, MdRefresh, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getLocalCache, setRouteToCache, isFavorited, removeRouteFromCache } from './LocalCache';


function Search({searchFun, routes, stations, setSelectedStation, selectedStation, selectedRoute, setSelectedRoute}){
    const [selectedNumber, setSelectedNumber] = useState("");
    const [upcoming, setUpcoming] = useState(false);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [favoriteOptions, addToFavList] = useState(populateFavDrop)
    const [favoriteIcon, toggleFavorite] = useState(<MdFavoriteBorder style={{color:'black'}}/>)

    function handleNumber(e){ setSelectedNumber(e.target.value); }
    function handleRoute(e){setSelectedRoute(e.target.value)}
    function handleStation(e){ setSelectedStation(e.target.value)}
    function handleUpcoming(e){ setUpcoming(e.target.checked); }
    function handleFromStation(e){ setFromStation(e.target.value); }
    function handleToStation(e){ setToStation(e.target.value); }
    
    function handleFavoriteSelection(e){
        addToFavList(populateFavDrop())
        e.preventDefault();
        searchFun("", e.target.value, "", "", "", "")
    }

    function setToFavorites(){
        if(favoriteIcon.type.name==="MdFavorite"){
            let res = removeRouteFromCache(selectedRoute)
            if(res===0){
                toggleFavorite(<MdFavoriteBorder style={{color:'black'}}/>)
            }
        } else {
            let res = setRouteToCache(selectedRoute);
            if(res===0){
                toggleFavorite(<MdFavorite style={{color:'red'}}/>)
            }
        }
        
    }

    function populateFavDrop(){
        let favNames = ["---"]
        const cachedTrains = getLocalCache()
        Object.keys(cachedTrains.data).forEach(trainName => {
            favNames.push(trainName)
        });
        const mapping = favNames.map((element, index) => <option value={element} key={index}>{element}</option>)
        return mapping
    }

    const search = (event) =>{
        event.preventDefault();
        searchFun(selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation);
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
        clearSearch();
        searchFun("", "", "", false, "", "");
    }

    useEffect(() => {
        if (isFavorited(selectedRoute) === 'red') {
            toggleFavorite(<MdFavorite style={{color:'red'}}/>);
        } else {
            toggleFavorite(<MdFavoriteBorder style={{color:'black'}}/>);
        }
    }, [selectedRoute]);

    return (

        <form className='form' onSubmit={search}>
                <label className="favorites-dropdown-selection">
                    <span className="select-label">
                    Favorites:
                    <select className="favorites-dropdown" onClick={handleFavoriteSelection}>{favoriteOptions}</select>
                    </span>
                </label>

                <div className='top-label'>
                    Search options: 
                </div>
                <span className="select-label">
                        Train Number:
                        <input className="select-box" value={selectedNumber} onChange={handleNumber} type="number" min='1'></input>
                    </span>
                <span className="select-label">
                        Route:
                        <select className="select-box" value={selectedRoute} onChange={handleRoute} children={routes}></select>
                        <div onClick={setToFavorites} className='form-button' style={{border:'none'}}>{favoriteIcon}</div>
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