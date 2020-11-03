import React from 'react';
import { changeWeatherName } from '../../helpers/selectors';

export const WeatherRing = props => {
  return (
        <article className='weather-ring'>
          <h1>{changeWeatherName(props.weather)}</h1>
          <h3><span>Feels like </span>{props.feelsLikeTemp}°</h3>
          <p>{props.minTemp}° / {props.maxTemp}°</p>
        </article>
  );
};