import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { getItem, getSuggestionCategory } from '../../helpers/selectors';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import './styles.scss';

import { WeatherRing } from './WeatherRing';
import EventList from './EventList';
import { DepartureTime } from '../DepartureTime';
import RecommendationList from './RecommendationList';


export const Home = props => {
  const [headerSize, setHeaderSize] = useState('big');

  useScrollPosition(({ prevPos, currPos }) => {
    if (headerSize === 'big' && currPos.y < -400) {
      setHeaderSize('small');
    } else if (headerSize === 'small' && currPos.y >= -150) {
      setHeaderSize('big');
    }
  })

  const NOW = 'now';
  const UPCOMING = 'upcoming';
  const LATER = 'later';
  const DONE = 'done';

  return (
    <Fragment>
      {
        props.loggedIn
          ? <div className='home'>
            <header className={headerSize}>
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

            {Object.keys(props.recommendations).length &&
              <section className='recommendations'>
                <Fragment>
                  {!props.recommendations.now ?
                    <Fragment>
                      <RecommendationList recommendations={props.recommendations[UPCOMING]} handleCheck={props.handleCheck} type={UPCOMING}>Upcoming: </RecommendationList>
                      <RecommendationList recommendations={props.recommendations[LATER]} handleCheck={props.handleCheck} type={LATER}>Later: </RecommendationList>
                    </Fragment> :
                    <RecommendationList recommendations={props.recommendations[NOW]} handleCheck={props.handleCheck} type={NOW}>Now: </RecommendationList>
                  }
                  <RecommendationList recommendations={props.recommendations[DONE]} handleCheck={props.handleCheck} type={DONE}>Done: </RecommendationList>
                </Fragment>
            </section>}

          </div>
          : <Redirect to='/login' />
      }
    </Fragment>
  );
};
