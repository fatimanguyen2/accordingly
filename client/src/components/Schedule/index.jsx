import React, { Fragment } from 'react';
import { Redirect } from "react-router-dom";

import './styles.scss'
import DepartureTime from '../DepartureTime';
import EventList from './EventList';

export const Schedule = props => {
  const TODAY = 'today';
  const REPEATING = 'repeating';
  const FUTURE = 'future';

  return (
    <Fragment>
      {props.loggedIn ?
        <div className='schedule'>
          <h1>Schedule</h1>
          {props.events[TODAY] && <EventList allEvents={props.events} events={props.events[TODAY]} type={TODAY} deleteEvent={props.deleteEvent} onEdit={props.onEdit}>Today</EventList>}
          {props.events[REPEATING] && <EventList events={props.events[REPEATING]} type={REPEATING} deleteEvent={props.deleteEvent} onEdit={props.onEdit}>Repeating</EventList>}
          {props.events[FUTURE] && <EventList allEvents={props.events} events={props.events[FUTURE]} type={FUTURE} deleteEvent={props.deleteEvent} onEdit={props.onEdit}>Future</EventList>}
        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};