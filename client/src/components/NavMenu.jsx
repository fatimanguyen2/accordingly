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
      <ul>
        {props.loggedIn ? <li>Home</li> : <li>Login</li>}
        {!props.loggedIn && <li>Register</li>}
        <li>About</li>
        {props.loggedIn && <li>Settings</li>}
        {props.loggedIn && <li>Refresh</li>}
      </ul>
    </button>
  );
};