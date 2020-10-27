import React from 'react';
import moment from 'moment';

export default function DepartureTime(props) {
  return (
    <section>
      <p>Leave By:</p>
      <p>{moment(props.departureTime).format('h:mm a')}</p>
    </section>
  );
};