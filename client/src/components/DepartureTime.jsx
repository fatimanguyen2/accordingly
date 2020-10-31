import React from 'react';
import moment from 'moment';

export const DepartureTime = props => {
  return (
    <section className='departure-time'>
      <p>Leave By:</p>
      <p>{props.departureTime && moment(props.departureTime).format('h:mm a')}</p>
    </section>
  );
};