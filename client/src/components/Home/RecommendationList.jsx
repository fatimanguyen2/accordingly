import React from 'react';
import RecommendationItem from './RecommendationListItem'

export default function RecommendationList(props) {
  const items = props.recommendations.map(item => {
    return <RecommendationItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      handleCheck={props.handleCheck}
      type={props.type}
      reRender={props.reRender}
    />
  });

  return (
    <div className='recommendation-list'>
      <h2 className='recommendation-list__title'>{props.children}</h2>
      <ul>
        {items}
      </ul>
    </div>
  );
};