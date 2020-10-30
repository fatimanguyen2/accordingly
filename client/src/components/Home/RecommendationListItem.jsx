import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function RecommendationItem(props) {
  const checked = props.type === 'done' ? true : false; //ensures that items in done list show as checked and others show as unchecked
  const [toggle, setToggle] = useState(false);
  // const [check, setCheck] = useState(checked)

  const buttonClass = classNames('recommendation-list-item ', {'recommendation-list-item--checked': props.type === 'done'})

  const onClick = () => {
    props.handleCheck(props.id, props.type);
    // setCheck(prev => !prev)
  };

  return (
    <li className={buttonClass}>
    {/* <li className='recommendation-list-item '> */}
      <div className='recommendation-list-item__main'>
        <div onClick={onClick} className='recommendation-list-item--clickable'>
          <input type='checkbox' id='item' checked={checked} onChange={() => { }} /> 
          <label htmlFor='item'>{props.name}</label>
        </div>
          <FontAwesomeIcon icon={faCaretDown} className='recommendation-list-item__icon' onClick={() => setToggle(prev => !prev)} />
      </div>
      {toggle && <div onClick={() => setToggle(prev => !prev)} ><p>{props.description}</p></div>}
    </li>
  );
};