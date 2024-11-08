import './styles/App.css';
import Amtrak from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import Map from './Map';
import TrainList from './TrainList';
import Search from './Search';

function App() {
    const api = new Amtrak.APIInstance();

    const [searchBy, setSearchBy] = useState('1');
    const [searchKey, setSearchKey] = useState("Enter train line or number");
    const [allTrains, setAllTrains] = useState([]);

     useEffect(() => {
        api.onUpdated = function() {
            setAllTrains(this.trains);
        }
        api.update();
    },[])

    function handleFormChange(e){
        setSearchKey(e.target.value);
    }

    function handleSelectChange(e){
        setSearchBy(e.target.value);
    }
    const sortTrains = () => {
        if (searchBy === '1'){ 
            return allTrains.filter(t => t.number === searchKey);
        }
        else {
            return allTrains.filter(t => t.routeName === searchKey);
        }
    }

  return (
      <div className="App">
          <div className="header">
              <div className="heading-box">
                  <img src={train_icon} alt="Train Icon" className="train_icon" />
                  <h1>TrainTracker</h1>
              </div>
              <div className='content'>
              <Search className='Search' searchChange={handleFormChange} selectChange={handleSelectChange} searchVal={searchKey} searchByVal={searchBy}/>
              <TrainList className = 'TrainList' trains={sortTrains()}/>
              <Map className = 'Map' />
              </div> 
          </div>
      </div>
  );
}

export default App;
