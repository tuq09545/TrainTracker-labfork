import './styles/TrainPage.css';

import {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { filterTrains } from './functionality/app';
import TrainInfo from './TrainInfo';
import Search, { SearchObject } from './Search';

function TrainPage({allTrains}){
    const location = useLocation();
    const [isLoading,setIsLoading] = useState(true);

    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");

    const [selectedTrains,setSelectedTrains] = useState([]);

    function findTrain(){
        let search = new SearchObject();
        search.number = number;
        search.date = date;
        let trains = filterTrains(allTrains,search);
        setSelectedTrains(trains);
    }

    // wait for allTrains to load
    if(isLoading){
        if(allTrains.length > 0){
            findTrain();
            setIsLoading(false);
        }
    }

    // updates on window location change
    useEffect(() =>{
        let url = window.location.href;
        let split = url.split("/");
        let params = split[split.length -1];

        if (params.includes("?date=")){
            let [n,d] = params.split("?date=");
            setNumber(n);
            setDate(decodeURIComponent(d));
        } else {
            setNumber(params);
            setDate("");
        }
    },[location])

    // updates on number or date change
    useEffect(() => {
        if(!isLoading){
            findTrain();
        } 
    },[number,date])

    let content = <h2>No Trains Found</h2>
    

    if(isLoading){
        content=<h2>Loading...</h2>
    }

    // Multiple Results
    if (selectedTrains.length > 1){
        content = <Tiebreaker trains={selectedTrains}/>
    } 
    
    if (selectedTrains.length == 1){
        content = <TrainInfo train={selectedTrains[0]}/>
    }

    return(
        <div className="train-page">
            <TrainForm/>
            {content}
        </div>
    )
}

function Tiebreaker(t){
    return(
        <div className='tiebreaker'>
            <h2>Multiple Results:</h2>
            {t.trains.map((train,index) => {
                return(
                    <Link key={index} to={"/trains/"+train.number+"?date="+encodeURIComponent(train.scheduledDeparture)}>
                        <div>
                            <h2 className='route'>{train.routeName} (#{train.number}) - Departed {train.scheduledDeparture}</h2>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export function TrainForm(){
    const [selectedNumber, setSelectedNumber] = useState("");

    const navigate = useNavigate();

    function handleNumber(e){ setSelectedNumber(e.target.value); }

    function search(event){
        event.preventDefault();
        navigate("/trains/"+selectedNumber);
        setSelectedNumber("");
    }

    return (
        <form onSubmit={search} className="train-form">
            <input className="select-box" value={selectedNumber} placeholder="Quick Search by Number" onChange={handleNumber} type="number" min='1'></input>
        </form>
    )
}

export default TrainPage;