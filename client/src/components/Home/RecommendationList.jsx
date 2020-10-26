import React from 'react';
import RecommendationItem from './RecommendationItem'

export default function RecommendationList(props) {
  const items = props.recommendations.map(item => {
    return <RecommendationItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      handleCheck={props.handleCheck}
      type={props.type}
    />
  });

  return (
    <ul>
      <h2>{props.children}</h2>
      {items}
    </ul>
  );
};