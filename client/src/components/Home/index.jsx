import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";
import { getItem, getSuggestionCategory } from '../../helpers/selectors';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import './styles.scss';

import { WeatherRing } from './WeatherRing';
import EventList from './EventList';
import DepartureTime from '../DepartureTime';
import RecommendationList from './RecommendationList';


export const Home = props => {
  const [recommendations, setRecommendations] = useState({ ...props.recommendations, done: [] });
  const [headerSize, setHeaderSize] = useState('big');

  useScrollPosition(({ prevPos, currPos }) => {
    if (headerSize === 'big' && currPos.y < -400) {
      setHeaderSize('small');
    } else if (headerSize === 'small' && currPos.y >= -150) {
      setHeaderSize('big');
    }
    console.log(currPos.y) //-260
  })

  const NOW = 'now';
  const UPCOMING = 'upcoming';
  const LATER = 'later';
  const DONE = 'done';

  const handleCheck = (id, type) => {
    const item = getItem(id, recommendations[type]);
    const category = getSuggestionCategory(id, props.recommendations);

    // if item gets checked and is in upcoming/later list, remove from that list and add to done list
    if (type !== DONE) {
      setRecommendations(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id), done: [...prev.done, item] }));
    } else { //if item is unchecked from done list, move it back to original list(upcoming/later) or remove if no longer relevant
      setRecommendations(prev => ({ ...prev, done: prev[type].filter(item => item.id !== id), [category]: [...prev[category], item] }));
    }
  };

  return (
    <Fragment>
      {
        props.loggedIn ?
          <div className='home'>
            <header className={headerSize} /*onClick={() => setHeaderSize(headerSize === 'big' ? 'small' : 'big')}*/>
              <div className={`${headerSize}__weather-event`}>
                <WeatherRing
                  mainWeather={props.weather.mainWeather && props.weather.mainWeather[0]}
                  feelsLikeTemp={Math.round(props.weather.feelsLikeTemp)}
                  minTemp={Math.round(props.weather.feels_likeMin)}
                  maxTemp={Math.round(props.weather.feels_likeMax)}
                  size={headerSize}
                />
                {props.events && <EventList events={props.events} />}
              </div>
              <DepartureTime departureTime={props.events && props.events[0].leave_by} />
            </header>
            <section className='recommendations'>
              {props.events.length ?
                <Fragment>
                  <RecommendationList recommendations={recommendations[UPCOMING]} handleCheck={handleCheck} type={UPCOMING}>Upcoming: </RecommendationList>
                  <RecommendationList recommendations={recommendations[LATER]} handleCheck={handleCheck} type={LATER}>Later: </RecommendationList>
                </Fragment> :
                <RecommendationList recommendations={recommendations[NOW]} handleCheck={handleCheck} type={NOW}>Now: </RecommendationList>
              }
              <RecommendationList recommendations={recommendations[DONE]} handleCheck={handleCheck} type={DONE}>Done: </RecommendationList>
            </section>
          </div> :
          <Redirect to='/login' />
      }
    </Fragment>
  );
};
