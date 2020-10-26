import React from 'react';
import RecommendationItem from './RecommendationItem'

export default function RecommendationList(props) {
  const items = props.recommendations.map(item => {
    return <RecommendationItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      handleChecked={props.handleChecked}
      type={props.type}
    />
  });

  return (
    <ul>
      {props.children}
      {items}
    </ul>
  );
};