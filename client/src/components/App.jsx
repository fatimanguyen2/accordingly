import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import WeatherRing from './WeatherRing'


function App() {
return (
    <main>
        <WeatherRing
            mainWeather='Sunny'
            feelsLikeTemp='23'
            minTemp='18'
            maxTemp='29'
        />
    </main>
);
}

export default App;
