import React from 'react';
import { getRecurrenceArray } from '../../helpers/selectors';

import DepartureTime from '../DepartureTime';
import EventListItem from './EventListItem';

export default function EventList(props) {
  const events = props.events.map(event => {
    const id = props.type === 'repeating'? event.entry_id : event.id
    return <EventListItem
      key={props.type + id}
      id={id}
      entry_id={event.entry_id}
      onEdit={props.onEdit}
      type={props.type}
      title={event.entry}
      start={props.type === 'repeating' ? event.next_event.start_time : event.start_time }
      end={props.type === 'repeating' ? event.next_event.end_time : event.end_time }
      weather={props.type === 'repeating' ? event.next_event.weather : event.weather }
      destination={props.type === 'repeating'? `${event.next_event.address}, ${event.next_event.city}` : `${event.address}, ${event.city}`}
      recurrences={props.type === 'repeating'? event.recurrences : getRecurrenceArray(event, props.allEvents)}
      deleteEvent={props.deleteEvent}
    />
  })
  return (
    <ul className='event-list'>
      <h2>{props.children}</h2>
      {props.type === 'today' && <DepartureTime departureTime={props.events && props.events.length > 0 && props.events[0].leave_by} />}
      {events}
    </ul>
  );
};