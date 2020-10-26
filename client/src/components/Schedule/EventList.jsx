import React from 'react';

import EventListItem from './EventListItem';

export default function EventList(props){
  let events = props.events.map(event => {
    return <EventListItem
      key = {event.entry_id}
      title = {event.entry}
      startTime = {event.start_time}
      endTime = {event.end_time}
      weatherIcon = {event.weatherIcon} 
      destination = {event.destination}
      recurrences = {event.recurrences}
    />
  })
  return (
    <ul className='event-list'>
      <h2>{props.children}</h2>
      {events}
    </ul>
  );
};