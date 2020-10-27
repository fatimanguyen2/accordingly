import React, { useState } from 'react';
import { getItem, getSuggestionCategory } from '../../helpers/selectors';

import WeatherRing from './WeatherRing'
import EventList from './EventList'
import DepartureTime from '../DepartureTime';
import RecommendationList from './RecommendationList'


export const Home = (props) => {
    const [recommendations, setRecommendations] = useState({ ...props.suggestions, done: [] })

    const handleCheck = (id, type) => {
        const item = getItem(id, recommendations[type]);
        const category = getSuggestionCategory(id, props.suggestions);

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
                mainWeather={props.weather.mainWeather}
                feelsLikeTemp={props.weather.feelsLikeTemp}
                minTemp={props.weather.minTemp}
                maxTemp={props.weather.maxTemp}
            />
            <section>
                <EventList events={props.events.today} />
            </section>
            <DepartureTime departureTime={props.events.departureTime} />
            <section>
                <RecommendationList recommendations={recommendations.upcoming} handleCheck={handleCheck} type='upcoming'>Upcoming: </RecommendationList>
                <RecommendationList recommendations={recommendations.later} handleCheck={handleCheck} type='later'>Later: </RecommendationList>
                <RecommendationList recommendations={recommendations.done} handleCheck={handleCheck} type='done'>Done: </RecommendationList>
            </section>
        </div>
    );
};
