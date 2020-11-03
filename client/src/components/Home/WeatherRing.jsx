import React from 'react';
import moment from 'moment';
import { changeWeatherName } from '../../helpers/selectors';

export const WeatherRing = props => {
  return (
        <article className='weather-ring'>
          <h1>{changeWeatherName(moment(),props.weather)}</h1>
          <h3><span>Feels like </span>{props.feelsLikeTemp}°</h3>
          <p>{props.minTemp}° / {props.maxTemp}°</p>
        </article>
  );
};