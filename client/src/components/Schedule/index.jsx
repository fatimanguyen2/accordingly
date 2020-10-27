import React from 'react';

import DepartureTime from '../DepartureTime';
import EventList from './EventList';

export const Schedule = props => {
  const today = 'today';
  const repeating = 'repeating';
  const future = 'future'

  return (
    <div>
      <DepartureTime departureTime={props.events.departureTime} />
      <EventList allEvents={props.events} events={props.events[today]} type={today}>Today:</EventList>
      <EventList events={props.events[repeating]} type={repeating}>Repeating:</EventList>
      <EventList events={props.events[future]} type={future}>Future:</EventList>
    </div>
  );
};