import './App.css';
import train_icon from './train_icon.png';
import React, {useRef} from 'react'

function App() {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + inputRef.current.value);
        event.preventDefault();
      };

  return (
      <div className="App">
          <div className="header">
              <div className="heading-box">
                  <img src={train_icon} alt="Train Icon" className="train_icon" />
                  <h1>TrainTracker</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <input type="text" ref={inputRef} defaultValue="Train to track here"></input>
                <button type="submit">Request</button>
              </form>
          </div>
      </div>
  );
}

export default App;
