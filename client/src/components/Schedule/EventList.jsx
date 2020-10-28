import React from 'react';
import { getRecurrenceArray } from '../../helpers/selectors';

import EventListItem from './EventListItem';

export default function EventList(props) {
  const events = props.events.map(event => {
    const id = props.type === 'repeating'? event.entry_id : event.id
    return <EventListItem
      key={props.type + id}
      id={id}
      type={props.type}
      title={event.entry}
      start={props.type === 'repeating' ? event.next_event.start_time : event.start_time }
      end={props.type === 'repeating' ? event.next_event.end_time : event.end_time }
      weather={event.weather}
      destination={props.type === 'repeating'? event.next_event.destination : event.destination}
      recurrences={props.type === 'repeating'? event.recurrences : getRecurrenceArray(event, props.allEvents)}
      deleteEvent={props.deleteEvent}
    />
  })
  return (
    <ul className='event-list'>
      <h2>{props.children}</h2>
      {events}
    </ul>
  );
};