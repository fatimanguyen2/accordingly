/* eslint-disable no-unused-vars */
import React from 'react';

export default function WeatherRing(props) {
  return (
    <article className='weather-ring'>
      <h1>{props.mainWeather}</h1>
      <h3><span>Feels like </span>{props.feelsLikeTemp}°</h3>
      <h4>{props.minTemp}° / {props.maxTemp}°</h4>
    </article>
  );
};