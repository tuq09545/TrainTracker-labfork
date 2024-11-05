import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Amtrak, { Train } from './AmtrakAPI'
import Map from './Map';
import TrainList from './TrainList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <Map/>
    <TrainList/>
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
