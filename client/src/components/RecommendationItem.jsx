import React, { useState } from 'react';
import ItemToggle from './ItemToggle'

export default function RecommendationItem(props) {
  const [toggle, setToggle] = useState(false);
  const [checked, setCheck] = useState(false);

  // const toggleHandler = () => {
  //   toggle? setToggle(false) : setToggle(true);
  //   console.log(toggle);
  // };
  return (
    <li>
      <div>
        <div onClick={() => setCheck(!checked)}>
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