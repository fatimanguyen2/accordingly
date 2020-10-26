import React from 'react';

import DepartureTime from '../DepartureTime';
import EventList from './EventList';

const events = [
  { id: 1, title: 'work', startTime: '9:00', endTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7'},
  { id: 2, title: 'lunch', startTime: '10:00', endTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' },
  { id: 3, title: 'meeting', startTime: '11:00', endTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' },
  { id: 4, title: 'meeting', startTime: '13:00', endTime: '15:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png', destination: '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7' }
]

export default function Schedule(props) {
  return (
    <div>
      <DepartureTime departureTime='8:24 am' />
      <EventList events={events} />
    </div>
  );
};