import React from 'react';

import DepartureTime from '../DepartureTime';
import EventList from './EventList';

const events = {
  "today": [
    {
      "entry": "commute",
      "id": 1,
      "is_outdoor": true,
      "destination": {
        "x": 49.2301,
        "y": -123.10867
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "is_from_start_date": false,
      "entry_id": 1,
      "type_of": "weekly",
      "initial": "2020-03-09T04:00:00.000Z",
      "interval": 1,
      "recurrence_id": 1,
      "weather": null
    },
    {
      "entry": "morning run",
      "id": 6,
      "is_outdoor": true,
      "destination": {
        "x": 49.259432,
        "y": -123.100795
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "07:00:00",
      "end_time": "07:30:00",
      "is_from_start_date": false,
      "entry_id": 2,
      "type_of": "daily",
      "initial": "2020-03-05T05:00:00.000Z",
      "interval": 1,
      "recurrence_id": 2,
      "weather": null
    }
  ],
  "repeating": [{
    "entry": "commute",
    "id": 1,
    "destination": {
      "x": 49.2301,
      "y": -123.10867
    },
    "start_date": "2020-03-05T05:00:00.000Z",
    "end_date": null,
    "start_time": "08:00:00",
    "end_time": "04:00:00",
    "is_from_start_date": false,
    "next_event": "2020-10-28T04:00:00.000Z",
    "next_weather": null,
    "recurrences": [
      {
        "type_of": "weekly",
        "initial": "2020-03-09T04:00:00.000Z",
        "interval": 1
      },
      {
        "type_of": "weekly",
        "initial": "2020-03-10T04:00:00.000Z",
        "interval": 1
      }
    ]
  }],
  "future": []
}

const getRecurrenceArray = (event, list) => {
  for (const rec of list.repeating) {
    if (event.entry === rec.entry) {
      return rec
    }
  }
}
export default function Schedule(props) {
  const today = 'today';
  const repeating = 'repeating';
  const future = 'future'
  return (
    <div>
      <DepartureTime departureTime='8:24 am' />
      <EventList events={events[today]} type={today}>Today:</EventList>
      <EventList events={events[repeating]} type={repeating}>Repeating:</EventList>
      <EventList events={events[future]} type={future}>Future:</EventList>
    </div>
  );
};