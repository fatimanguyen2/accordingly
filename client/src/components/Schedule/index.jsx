import React, { Fragment } from 'react';
import { Redirect } from "react-router-dom";

import DepartureTime from '../DepartureTime';
import EventList from './EventList';

export const Schedule = props => {
  const TODAY = 'today';
  const REPEATING = 'repeating';
  const FUTURE = 'future';

  return (
    <Fragment>
      {props.loggedIn ?
        <div>
          <DepartureTime departureTime={props.events.today[0].leave_by} />
          <EventList allEvents={props.events} events={props.events[TODAY]} type={TODAY}>Today:</EventList>
          <EventList events={props.events[REPEATING]} type={REPEATING}>Repeating:</EventList>
          <EventList events={props.events[FUTURE]} type={FUTURE}>Future:</EventList>
        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};