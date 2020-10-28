import React, { Fragment } from 'react';

export const WeatherRing = props => {
  return (
    <article className='weather-ring'>
      <h1>{props.mainWeather}</h1>
      {props.feelsLikeTemp &&
        <Fragment>
          <h3><span>Feels like </span>{props.feelsLikeTemp}°</h3>
          <h4>{props.minTemp}° / {props.maxTemp}°</h4>
        </Fragment>
      }
    </article>
  );
};