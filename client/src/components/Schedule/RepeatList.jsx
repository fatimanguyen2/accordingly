import React from 'react';

import RepeatItemList from './RepeatItemList'

export default function RepeatList(props) {
  const items = props.reoccurences.map(reoccurence => {
    return <RepeatItemList/>
  });
  return (
    <ul>
      {items}
    </ul>);
};