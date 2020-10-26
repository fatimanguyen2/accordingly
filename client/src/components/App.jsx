import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import WeatherRing from './WeatherRing'
import EventList from './EventList'
import DepartureTime from './DepartureTime';
import RecommendationList from './RecommendationList'


function App() {
    const suggestions = {upcoming: [{id:1, name: 'hat', description: 'Keep that head sheltered from the cold'}, {id:2, name: 'suncreen', description: 'It is sunny outside'}], later: [{id:3, name: 'top', description: 'layer up'}, {id:2, name: 'suncreen', description: 'It is sunny outside'}]}
    
    const [recommendations, setRecommendations] = useState({...suggestions, done: []})
    
    const events = [
        { id: 1, title: 'work', startTime: '9:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 2, title: 'lunch', startTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 3, title: 'meeting', startTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 4, title: 'meeting', startTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' }
    ];

    const getItem = (id, array) => {array.find(element => element.id === id)};
    
    const handleChecked = (id, type) => {
        if (type === 'upcoming' || type === 'later') {
            console.log(id, type)
        }
    };
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
            <section>
                <RecommendationList recommendations={recommendations.upcoming} handleChecked={handleChecked} type='upcoming'>Upcoming: </RecommendationList>
                <RecommendationList recommendations={recommendations.later} handleChecked={handleChecked} type='later'>Later: </RecommendationList>
                <RecommendationList recommendations={recommendations.done} handleChecked={handleChecked} type='done'>Done: </RecommendationList>
            </section>
        </main>
    );
}

export default App;
