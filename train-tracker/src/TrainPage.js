import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { filterTrainPage } from './functionality/app';
import TrainInfo from './TrainInfo';

function TrainPage({allTrains}){
    const location = useLocation();
    const [isLoading,setIsLoading] = useState(true);

    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");

    const [selectedTrains,setSelectedTrains] = useState([]);

    // wait for allTrains to load
    if(isLoading){
        if(allTrains.length > 0){
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
            setDate(d);
        } else {
            setNumber(params);
            setDate("");
        }
    },[location])

    // updates on number or date change once allTrains is loaded
    useEffect(() => {
        if(!isLoading){
            let trains = filterTrainPage(allTrains,number,date);
            console.log(trains);
            setSelectedTrains(trains);
        } 
    },[isLoading,number,date])

    if(isLoading){
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }

    // Multiple Results
    if (selectedTrains.length > 1){
        return(
            <div>
                <h2>Multiple Results</h2>
            </div>
        )
    } 
    
    if (selectedTrains.length == 1){
        return <TrainInfo train={selectedTrains[0]}/>
    }

    return(
        <div>
            <h2>No Trains Found</h2>
        </div>
    )
}

export function TrainForm(){
    const [selectedNumber, setSelectedNumber] = useState("");

    const navigate = useNavigate();

    function handleNumber(e){ setSelectedNumber(e.target.value); }

    function search(event){
        event.preventDefault();
        navigate("/train/"+selectedNumber);
    }

    return (
        <form onSubmit={search}>
            <input className="select-box" value={selectedNumber} placeholder="Search by Number" onChange={handleNumber} type="number" min='1'></input>
        </form>
    )
}

export default TrainPage;