import React, { useState } from 'react';
import moment from 'moment';
const classnames = require('classnames');

export const NavMenu = (props) => {

  const [collapse, setCollapse] = useState(false);

  return (
    <button
      className = {
        classnames('button', {
        'button--collapse':false,
        'button--expand':false,
        })
      }>
      <ul>
        {props.loggedIn ? <li><a>Home</a></li> : <li><a>Login</a></li>}
        {!props.loggedIn && <li><a>Register</a></li>}
        {props.loggedIn && <li><a>Schedule</a></li>}
        <li><a>About</a></li>
        {props.loggedIn && <li><a>Settings</a></li>}
        {props.loggedIn && <li>
          <a>Refresh</a>
          <span>{moment(1603740043000).fromNow()}</span>
        </li>}
      </ul>
    </button>
  );
};