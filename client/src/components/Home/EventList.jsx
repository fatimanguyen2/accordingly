import React from 'react';

import EventListItem from './EventListItem';

export default function EventList(props) {
  const events = props.events.map(event => {
    return <EventListItem
      key={event.id}
      title={event.title}
      startTime={event.startTime}
      weatherIcon={event.weatherIcon} //TO FIX
    />
  }).slice(0, 3)
  return (
    <ul className='event-list'>
      {events}
    </ul>
  );
};