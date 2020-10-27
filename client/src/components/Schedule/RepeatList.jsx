import React from 'react';

import RepeatListItem from './RepeatListItem'

export default function RepeatList(props) {
  const items = props.recurrences.map(reccurence => {
    return <RepeatListItem
    key={reccurence.reocurrence_id}
    frequency={reccurence.type_of}
    initial={reccurence.initial}
    interval={reccurence.interval}
    />
  });
  return (
    <div>
      <p>Repeats</p>
      {items}
    </div>
  )
};