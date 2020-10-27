import React from 'react';
import { getRecurrenceArray } from '../../helpers/selectors';

import EventListItem from './EventListItem';

export default function EventList(props) {
  const events = props.events.map((event, id) => {
    return <EventListItem
      key={id}
      title={event.entry}
      startDate={props.type === 'today' ? event.start_date : event.next_event}
      startTime={event.start_time}
      endTime={event.end_time}
      weatherIcon={event.weatherIcon}
      destination={event.destination}
      recurrences={props.type === 'today'? getRecurrenceArray(event, props.allEvents): event.recurrences}
      type={props.type}
    />
  })
  return (
    <ul className='event-list'>
      <h2>{props.children}</h2>
      {events}
    </ul>
  );
};