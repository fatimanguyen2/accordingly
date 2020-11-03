import React from 'react';

import EventListItem from './EventListItem';

export default function EventList(props) {
  const events = props.events.map(event => {
    return <EventListItem
      key={event.entry_id}
      title={event.entry}
      start={event.start_time}
      weather={event.weather} //TO FIX
    />
  }).slice(0, 3)
  return (
    <ul className='event-list'>
      {events}
    </ul>
  );
};