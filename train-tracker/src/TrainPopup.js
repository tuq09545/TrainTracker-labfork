import ReactDOM from "react-dom";
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles/TrainPopup.css'
import TrainInfo from "./TrainInfo";
import { setRouteToCache, removeRouteFromCache, isFavorited } from './LocalCache';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {useState} from 'react'

function TrainPopup({onClose, children, actionBar, train}){

    const [favoriteIcon, toggleFavorite] = useState(<MdFavoriteBorder style={{color:'black'}}/>)

    function setToFavorites(e){
        if(favoriteIcon.type.name==="MdFavorite"){
            removeRouteFromCache(train.routeName)
            toggleFavorite(unfavorited)
        } else {
            setRouteToCache(train.routeName);
            toggleFavorite(favorited)
        }
        
    }

    function isFavorite(){ 
        if(isFavorited(train.routeName)==='red'){
            toggleFavorite(favorited);
        } else{
            toggleFavorite(unfavorited)
        }
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    const unfavorited = <MdFavoriteBorder style={{color:'black'}}/>
    const favorited = <MdFavorite style={{color:'red'}}/>

    return ReactDOM.createPortal(<div>
        <div onClick={onClose} className='overlay' ></div> 
        <div className='inner-modal-container'>
        <div className='action-bar'>
            {actionBar}
        </div> 
            <div className='modal-content'>
                {children}
                <button><Link to={"/trains/"+train.number+"?date="+encodeURIComponent(train.scheduledDeparture)} target="_blank">Open in New Tab</Link></button>
                <TrainInfo train={train}/>   
            </div>  
        </div>
    </div>,
    document.querySelector('.modal-container')
    );
}

export default TrainPopup;