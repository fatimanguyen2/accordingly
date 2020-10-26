import React, { useState } from 'react';
import moment from 'moment';
const classnames = require('classnames');

export const NavMenu = (props) => {

  const [collapse, setCollapse] = useState(false);

  const onClick = () => {
    props.handleCheck(props.id, props.type);
  };

  return (
    <button
      className = {
        classnames('button', {
        'button--collapse':collapse,
        'button--expand':!collapse,
        })
      }>
      {!collapse &&
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
      }
    </button>
  );
};