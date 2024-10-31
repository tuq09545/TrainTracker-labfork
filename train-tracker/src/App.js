import './App.css';
import train_icon from './train_icon.png';
function App() {

  return (

    <div className="App">
      <div className='heading'>
        <img src={train_icon} alt="Train Icon" className="train_icon"/>
        <h1>Train Tracker</h1>
      </div>
    </div>
  );
}

export default App;
