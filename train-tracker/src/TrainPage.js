import {useNavigate} from 'react-router-dom';

function TrainPage(){
    const url = window.location.href;
    const split = url.split("/");
    const params = split[split.length -1];

    return(
        <div>
            <h2>This is the train page</h2>
            <p>Params = {params}</p>
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