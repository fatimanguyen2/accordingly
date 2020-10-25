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
      <div onClick={() => setChecked(!checked)}>
        <input type='checkbox' checked={checked}/> Hello
      </div>
      <div>
      <ItemToggle toggle = {() => setToggle(!toggle)}/>
      </div>
    </li>
  );
};