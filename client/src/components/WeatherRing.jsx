/* eslint-disable no-unused-vars */
import React from 'react';

export default function WeatherRing(props) {
  return (
    <article className='weather-ring'>
      <h2>{props.mainWeather}</h2>
      <h3><span>Feels like</span>{props.feelsLikeTemp}°</h3>
      <h4>{props.minTemp}° / {props.maxTemp}°</h4>
    </article>
  );
};