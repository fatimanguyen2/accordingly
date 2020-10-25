import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import WeatherRing from './WeatherRing'
import EventList from './EventList'
import DepartureTime from './DepartureTime';
import RecommendationItem from './RecommendationItem'


function App() {
    const events = [
        { id: 1, title: 'work', startTime: '9:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 2, title: 'lunch', startTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 3, title: 'meeting', startTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 4, title: 'meeting', startTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' }
    ];
    return (
        <main>
            <WeatherRing
                mainWeather='Sunny'
                feelsLikeTemp='23'
                minTemp='18'
                maxTemp='29'
            />
            <section>
                <EventList events={events} />
            </section>
            <DepartureTime departureTime='8:24pm' />
            <RecommendationItem name='Sunscreen' description='It is sunny outside.'/>
        </main>
    );
}

export default App;
