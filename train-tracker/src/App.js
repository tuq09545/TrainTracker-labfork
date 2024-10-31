import './App.css';
import train_icon from './train_icon.png';
function App() {

  return (
      <div className="App">
          <div className="header">
              <div className="heading-box">
                  <img src={train_icon} alt="Train Icon" className="train_icon" />
                  <h1>TrainTracker</h1>
              </div>
          </div>
      </div>
  );
}

export default App;
