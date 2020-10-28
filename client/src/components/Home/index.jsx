import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";
import { getItem, getSuggestionCategory } from '../../helpers/selectors';

import './styles.scss';

import WeatherRing from './WeatherRing';
import EventList from './EventList';
import DepartureTime from '../DepartureTime';
import RecommendationList from './RecommendationList';


export const Home = props => {
  const [recommendations, setRecommendations] = useState({ ...props.suggestions, done: [] });
  const UPCOMING = 'upcoming';
  const LATER = 'later';
  const DONE = 'done';

  const handleCheck = (id, type) => {
    const item = getItem(id, recommendations[type]);
    const category = getSuggestionCategory(id, props.suggestions);

    // if item gets checked and is in upcoming/later list, remove from that list and add to done list
    if (type === UPCOMING || type === LATER ) {
      setRecommendations(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id), done: [...prev.done, item] }));
    } else { //if item is unchecked from done list, move it back to original list(upcoming/later) or remove if no longer relevant
      setRecommendations(prev => ({ ...prev, done: prev[type].filter(item => item.id !== id), [category]: [...prev[category], item] }));
    }
  };

  return (
    <Fragment>
      {
        props.loggedIn ?
          <div className='test'>
            <WeatherRing
              mainWeather={props.weather.mainWeather && props.weather.mainWeather[0]}
              feelsLikeTemp={Math.round(props.weather.feelsLikeTemp)}
              minTemp={Math.round(props.weather.feels_likeMin)}
              maxTemp={Math.round(props.weather.feels_likeMax)}
            />
            <section>
              {props.events.today && <EventList events={props.events.today} />}
            </section>
            <DepartureTime departureTime={props.events.today && props.events.today[0].leave_by} />
            <section>
              <RecommendationList recommendations={recommendations[UPCOMING]} handleCheck={handleCheck} type={UPCOMING}>Upcoming: </RecommendationList>
              <RecommendationList recommendations={recommendations[LATER]} handleCheck={handleCheck} type={LATER}>Later: </RecommendationList>
              <RecommendationList recommendations={recommendations[DONE]} handleCheck={handleCheck} type={DONE}>Done: </RecommendationList>
            </section>
          </div> :
          <Redirect to='/login' />
      }
    </Fragment>
  );
};
