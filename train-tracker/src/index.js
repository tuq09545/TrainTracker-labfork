import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Amtrak from './AmtrakAPI'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


//example use of API
const trainData = new Amtrak.APIInstance()
trainData.onUpdated = function () {
    for(let train of trainData.trains) {
        console.log(train.toString());
    }
}
trainData.update()
