import React from 'react';

import EventListItem from './EventListItem';

export default function EventList(props){
  let events = props.events.map(event => {
    return <EventListItem
      key = {event.id}
      title = {event.title}
      startTime = {event.startTime}
      endTime = {event.endTime}
      weatherIcon = {event.weatherIcon} 
      destination = {event.destination}
    />
  })
  return (
    <ul className='event-list'>
      {events}
    </ul>
  );
};