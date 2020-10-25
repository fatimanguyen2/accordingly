import React, { useState } from 'react';
import ItemToggle from './ItemToggle'

export default function RecommendationItem(props) {
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);

  // const toggleHandler = () => {
  //   toggle? setToggle(false) : setToggle(true);
  //   console.log(toggle);
  // };
  return (
    <li>
      <div>
        <div onClick={() => setChecked(!checked)}>
          <input type='checkbox' checked={checked}/> {props.name}
        </div>
        <div>
          <ItemToggle toggle = {() => setToggle(!toggle)}/>
        </div>
      </div>
      {toggle && <div><p>{props.description}</p></div>}
    </li>
  );
};