import React from 'react';

export const Button = props => {
  return <button className={props.classname} onClick={props.onClick}>{props.children}</button>
};