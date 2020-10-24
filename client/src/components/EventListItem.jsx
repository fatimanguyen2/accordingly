import React from 'react';

export default function EventListItem(props) {
  return (
  <li>{props.title} - {props.startTime} <img src={props.weatherIcon} alt='Weather icon'/></li>
  );
};