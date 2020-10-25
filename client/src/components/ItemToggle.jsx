import React from 'react';

export default function ItemToggle(props) {
  return <button onClick={props.toggle}><i className="fas fa-caret-down"></i></button>;
};