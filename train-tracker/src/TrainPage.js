import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function TrainPage({
    allTrains
}){
    const location = useLocation();
    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");

    // updates on location change
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

    if(allTrains){
        return(
            <div>
                <h2>No train found</h2>
            </div>
        )
    }

    return(
        <div>
            <h2>Loading...</h2>
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