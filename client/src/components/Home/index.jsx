import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import './styles.scss';

import { WeatherRing } from './WeatherRing';
import EventList from './EventList';
import { DepartureTime } from '../DepartureTime';
import RecommendationList from './RecommendationList';

const NOW = 'now';
const UPCOMING = 'upcoming';
const LATER = 'later';
const DONE = 'done';

export const Home = props => {
  const [headerSize, setHeaderSize] = useState('big');
  const [render, setRender] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (headerSize === 'big' && currPos.y < -400) {
      setHeaderSize('small');
    } else if (headerSize === 'small' && currPos.y >= -150) {
      setHeaderSize('big');
    }
  })

  const reRenderList = () => {
    setRender(!render);
  }

  return (
    <Fragment>
      {props.loggedIn

        ? <div className='home'>
          <header className={headerSize}>
            <div className={`${headerSize}__weather-event`}>
              <WeatherRing
                mainWeather={props.weather.mainWeather && props.weather.mainWeather.length > 0 && props.weather.mainWeather[0]}
                feelsLikeTemp={Math.round(props.weather.feelsLikeTemp)}
                minTemp={Math.round(props.weather.feels_likeMin)}
                maxTemp={Math.round(props.weather.feels_likeMax)}
                size={headerSize}
              />
              {props.events && props.events.length > 0? <EventList events={props.events}/> : <div className='no-event'><p>No events today</p></div>}
            </div>
            {props.events && props.events.length > 0 && <DepartureTime departureTime={props.events[0].leave_by} />}
          </header>

          {Object.keys(props.recommendations).length &&
            <section className='recommendations'>
              <Fragment>
                {!props.recommendations.now ?
                  <Fragment>
                    {props.recommendations[UPCOMING] && props.recommendations[UPCOMING].length > 0 && <RecommendationList recommendations={props.recommendations[UPCOMING]} handleCheck={props.handleCheck} reRender={reRenderList} type={UPCOMING}>Upcoming </RecommendationList>}
                    {props.recommendations[LATER] && props.recommendations[LATER].length > 0 && <RecommendationList recommendations={props.recommendations[LATER]} handleCheck={props.handleCheck} reRender={reRenderList} type={LATER}>Later </RecommendationList>}
                  </Fragment> :
                  <Fragment>
                    {props.recommendations[NOW] && props.recommendations[NOW].length > 0 && <RecommendationList recommendations={props.recommendations[NOW]} handleCheck={props.handleCheck} reRender={reRenderList} type={NOW}>Now </RecommendationList>}
                  </Fragment>
                }
                {props.recommendations[DONE] && props.recommendations[DONE].length > 0 && <RecommendationList recommendations={props.recommendations[DONE]} handleCheck={props.handleCheck} reRender={reRenderList} type={DONE}>Done </RecommendationList>}
              </Fragment>
            </section>}

        </div>
        : <Redirect to='/login' />
      }
    </Fragment>
  );
};
