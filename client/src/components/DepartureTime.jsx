import React from 'react';

export default function DepartureTime(props) {
  return (
    <section>
      <h3>Leave By:</h3>
      <h3>{props.departureTime}</h3>
    </section>
  );
};