import React from 'react';

import EventListItem from './EventListItem';

export default function EventList(props){
  let events = props.events.map(event => {
    return <EventListItem
      key = {event.entry_id}
      title = {event.title}
      startTime = {event.startTime}
      endTime = {event.endTime}
      weatherIcon = {event.weatherIcon} 
      destination = {event.destination}
      reoccurences = {event.reocurrences}
    />
  })
  return (
    <ul className='event-list'>
      <h2>{props.children}</h2>
      {events}
    </ul>
  );
};