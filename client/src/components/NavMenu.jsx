import React from 'react';
const classnames = require('classnames');

export const NavMenu = (props) => {
  return (
    <button
      className = {
        classnames('button', {
        'button--collapse':false,
        'button--expand':false,
        })
      }>
      {props.loggedIn ? 'Home' : 'Login'}
    </button>
  );
};