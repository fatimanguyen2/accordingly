import React from 'react';

import DepartureTime from '../DepartureTime';
import EventList from './EventList';

const events = {
  today: [
    {
      "entry": "event 1",
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
      "entry_id": 2
    },
    {
      "entry": "event 2",
      "start_time": "12:00:00",
      "end_time": "12:30:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
      "entry_id": 1,
      "recurrences": [
        {"type_of": "weekly",
        "initial": "2020-03-09T04:00:00.000Z",
        "interval": 1,
        "reocurrence_id": 1},
        {"type_of": "weekly",
        "initial": "2020-03-11T04:00:00.000Z",
        "interval": 1,
        "reocurrence_id": 2},
        {"type_of": "weekly",
        "initial": "2020-03-14T04:00:00.000Z",
        "interval": 2,
        "reocurrence_id": 3}
      ]
    }],
    repeating:
    [{
      "entry": "commute",
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
      "entry_id": 1,
      "type_of": "weekly",
      "initial": "2020-03-09T04:00:00.000Z",
      "interval": 1,
      "recurrence_id": 1
    },
    {
      "entry": "commute",
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
      "entry_id": 1,
      "type_of": "weekly",
      "initial": "2020-03-09T04:00:00.000Z",
      "interval": 1,
      "recurrence_id": 1
    }],
    future:
    [{
      "entry": "commute",
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7'
    }]
  }
export default function Schedule(props) {
  return (
    <div>
      <DepartureTime departureTime='8:24 am' />
      <EventList events={events.today}>Today:</EventList>
    </div>
  );
};