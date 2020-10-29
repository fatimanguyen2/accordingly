import React, { Fragment } from 'react';
import { changeWeatherName } from '../../helpers/selectors';

export const WeatherRing = props => {
  return (
    <article className='weather-ring'>
      <h1>{changeWeatherName(props.mainWeather)}</h1>
      {props.feelsLikeTemp &&
        <Fragment>
          <h3><span>Feels like </span>{props.feelsLikeTemp}°</h3>
          <p>{props.minTemp}° / {props.maxTemp}°</p>
        </Fragment>
      }
    </article>
  );
};