import React from 'react';

import DepartureTime from '../DepartureTime';
import EventList from './EventList';
import EventListItem from './EventListItem';

// const events = [
//   { id: 1, title: 'work', startTime: '9:00', endTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' },
//   { id: 2, title: 'lunch', startTime: '10:00', endTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' },
//   { id: 3, title: 'meeting', startTime: '11:00', endTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' },
//   { id: 4, title: 'meeting', startTime: '13:00', endTime: '15:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' }
// ]

const events = {
  today: [
    {
      "entry": "commute",
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "date": 'timestamp',
      "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7'
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
      "reocurrence_id": 1
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
      "reocurrence_id": 1
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
      "reocurrence_id": 1
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
      {/* <EventList events={[]}>Repeating:</EventList> */}
      {/* <EventList events={[]}>Future:</EventList> */}
    </div>
  );
};