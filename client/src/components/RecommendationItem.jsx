import React, { useState } from 'react';
import ItemToggle from './ItemToggle'

export default function RecommendationItem(props) {
  const [toggle, setToggle] = useState(false);
  const [checked, setCheck] = useState(false);

  const onClick = () => {
    setCheck(!checked);
    if (!checked) {
      props.handleChecked(props.id, props.type);
    } else if (checked && props.type === 'done') {
      console.log('in done');
    }
  };
  return (
    <li>
      <div>
        <div onClick={onClick}>
          <input type='checkbox' checked={checked} onChange={() => setCheck(prev => prev)}/> {props.name}
        </div>
        <div>
          <ItemToggle toggle = {() => setToggle(!toggle)}/>
        </div>
      </div>
      {toggle && <div><p>{props.description}</p></div>}
    </li>
  );
};