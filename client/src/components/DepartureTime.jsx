import React from 'react';

export default function DepartureTime(props) {
  return (
    <section>
      <p>Leave By:</p>
      <p>{props.departureTime}</p>
    </section>
  );
};