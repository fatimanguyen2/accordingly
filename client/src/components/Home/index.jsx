import React, { useState } from 'react';

import WeatherRing from './WeatherRing'
import EventList from './EventList'
import DepartureTime from '../DepartureTime';
import RecommendationList from './RecommendationList'


export const Home = (props) => {
    const suggestions = {
        upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
        later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
    }

    const [recommendations, setRecommendations] = useState({ ...suggestions, done: [] })

    const events = [
        { id: 1, title: 'work', startTime: '9:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 2, title: 'lunch', startTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 3, title: 'meeting', startTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
        { id: 4, title: 'meeting', startTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' }
    ];

    const getItem = (id, array) => array.find(element => element.id === id);
    const getSuggestionCategory = (id, object) => {
        for (const category in object) {
            const result = object[category].find(item => item.id === id);
            if (result) {
                return category
            };
        }
    };

    // USE PREV BEFORE SPREADING??????
    const handleCheck = (id, type) => {
        const item = getItem(id, recommendations[type]);
        // const filteredArr = recommendations[type].filter(item => item.id !== id);
        // const doneArr = [...recommendations.done, item];
        const category = getSuggestionCategory(id, suggestions);

        // if item gets checked and is in upcoming/later list, remove from that list and add to done list
        if (type === 'upcoming' || type === 'later') {
            setRecommendations(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id), done: [...prev.done, item] }));
        } else { //if item is unchecked from done list, move it back to original list(upcoming/later) or remove if no longer relevant
            setRecommendations(prev => ({ ...prev, done: prev[type].filter(item => item.id !== id), [category]: [...prev[category], item] }));
        }
    };
    return (
        <div>
            <WeatherRing
                mainWeather='Sunny'
                feelsLikeTemp='23'
                minTemp='18'
                maxTemp='29'
            />
            <section>
                <EventList events={events} />
            </section>
            <DepartureTime departureTime='8:24 am' />
            <section>
                <RecommendationList recommendations={recommendations.upcoming} handleCheck={handleCheck} type='upcoming'>Upcoming: </RecommendationList>
                <RecommendationList recommendations={recommendations.later} handleCheck={handleCheck} type='later'>Later: </RecommendationList>
                <RecommendationList recommendations={recommendations.done} handleCheck={handleCheck} type='done'>Done: </RecommendationList>
            </section>
        </div>
    );
};
