import React from 'react';

export default function EventListItem(props) {
  return (
  <li>{props.title} - {props.startTime} {props.weatherIcon}</li>
  );
};