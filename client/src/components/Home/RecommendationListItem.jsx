import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function RecommendationItem(props) {
  const checked = props.type === 'done' ? true : false; //ensures that items in done list show as checked and others show as unchecked
  const [toggle, setToggle] = useState(false);

  const buttonClass = classNames('recommendation-list-item ', { 'recommendation-list-item--checked': props.type === 'done' });
  const toggleClass = classNames('recommendation-list-item__toggle',
    {
      'recommendation-list-item__toggle--rotate-up': toggle,
      'recommendation-list-item__toggle--rotate-down': !toggle
    });

  const onClick = () => {
    props.handleCheck(props.id, props.type);
    props.reRender();

  };

  return (
    <li className={buttonClass}>
      <div className='recommendation-list-item__main'>
        <div onClick={onClick} className='recommendation-list-item--clickable'>
          <input type='checkbox' id='item' checked={checked} onChange={() => { }} />
          <label htmlFor='item'>{props.name}</label>
        </div>
        <div className={toggleClass} onClick={() => setToggle(prev => !prev)}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {toggle && <div className='recommendation-list-item__desc' onClick={() => setToggle(prev => !prev)} ><p>{props.description}</p></div>}
    </li>
  );
};