import React from 'react';
import { getRecurrenceArray } from '../../helpers/selectors';

import { DepartureTime } from '../DepartureTime';
import { EventListItem } from './EventListItem';

export const EventList = props => {
  const events = props.events.map(event => {
    const id = event.entry_id
    return <EventListItem
      key={props.type + id}
      id={id}
      entry_id={event.entry_id}
      type={props.type}
      title={event.entry}
      start={props.type === 'repeating' ? event.next_event.start_time : event.start_time}
      end={props.type === 'repeating' ? event.next_event.end_time : event.end_time}
      weather={props.type === 'repeating' ? event.next_event.weather : event.weather}
      destination={props.type === 'repeating' ? `${event.next_event.address}, ${event.next_event.city}` : `${event.address}, ${event.city}`}
      recurrences={props.type === 'repeating' ? event.recurrences : getRecurrenceArray(event, props.allEvents)}
      onEdit={props.onEdit}
      deleteEvent={props.deleteEvent}
      onToggle={props.onToggle}
    />
  })

  return (
    <ul className='event-list'>
      <h2 className='event-list__title'>{props.children}</h2>
      {props.type === 'today' && props.events && props.events.length > 0 && <DepartureTime departureTime={props.events[0].leave_by} />}
      {events}
    </ul>
  );
};