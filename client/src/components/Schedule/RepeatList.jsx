import React from 'react';

import RepeatItemList from './RepeatItemList'

export default function RepeatList(props) {
  const items = props.recurrences.map(reoccurence => {
    return <RepeatItemList/>
  });
  return (
    <ul>
      {items}
    </ul>);
};