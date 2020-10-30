import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function RecommendationItem(props) {
  const checked = props.type === 'done' ? true : false; //ensures that items in done list show as checked and others show as unchecked
  const [toggle, setToggle] = useState(false);

  const onClick = () => {
    props.handleCheck(props.id, props.type);
  };

  return (
    <li className='recommendation-list-item'>
      <div className='recommendation-list-item__main'>
        <div onClick={onClick} className='recommendation-list-item--clickable'>
          <input type='checkbox' checked={checked} onChange={() => { }} /> {props.name}
        </div>
          <FontAwesomeIcon icon={faCaretDown} className='recommendation-list-item__icon' onClick={() => setToggle(prev => !prev)} />
      </div>
      {toggle && <div onClick={() => setToggle(prev => !prev)} ><p>{props.description}</p></div>}
    </li>
  );
};