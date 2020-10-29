import React, { useState } from 'react';
import ItemToggle from './ItemToggle'

export default function RecommendationItem(props) {
  const checked = props.type === 'done'? true : false; //ensures that items in done list show as checked and others show as unchecked
  const [toggle, setToggle] = useState(false);

  const onClick = () => {
      props.handleCheck(props.id, props.type);
  };
 
  return (
    <li className='recommendation-list-item'>
      <div className='recommendation-list-item__main'>
        <div onClick={onClick}>
          <input type='checkbox' checked={checked} onChange={() => {}}/> {props.name}
        </div>
        <div>
          <ItemToggle toggle = {() => setToggle(prev => !prev)}/>
        </div>
      </div>
      {toggle && <div><p>{props.description}</p></div>}
    </li>
  );
};