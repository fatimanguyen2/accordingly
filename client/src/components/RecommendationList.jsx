import React from 'react';
import RecommendationItem from './RecommendationItem'

export default function RecommendationList(props) {
  const items = props.recommendations.map(item => <RecommendationItem key={item.id} name={item.name} description={item.description} />);
  return (
      <ul>
        {props.children}
        {items}
      </ul>
  );
};