import React from 'react';

import RepeatListItem from './RepeatListItem'

export default function RepeatList(props) {
  const items = props.recurrences.map((reccurence, id) => {
    return <RepeatListItem
    key={reccurence.type_of + id}
    frequency={reccurence.type_of}
    initial={reccurence.initial}
    interval={reccurence.interval}
    />
  });
  return (
    <ul>
      <p>Repeats</p>
      {items}
    </ul>
  )
};