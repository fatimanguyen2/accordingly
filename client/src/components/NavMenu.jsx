import React, { useState } from 'react';
import moment from 'moment';
const classnames = require('classnames');

export const NavMenu = (props) => {

  const [collapse, setCollapse] = useState(false);

  const onClick = () => {
    setCollapse(state => {
      return !state;
    });
  };

  return (
    <div>
      <button
        onClick={onClick}
        className = {
          classnames('button', {
          'button--collapse':collapse,
          'button--expand':!collapse,
          })
        }>
          Menu
      </button>
      {!collapse &&
        <ul>
          {props.loggedIn ? <li><a>Home</a></li> : <li><a>Login</a></li>}
          {!props.loggedIn && <li><a>Register</a></li>}
          {props.loggedIn && <li><a>Schedule</a></li>}
          <li><a>About</a></li>
          {props.loggedIn && <li><a>Settings</a></li>}
          {props.loggedIn && <li>
            <a>Refresh</a>
            <span>{moment(props.time).fromNow()}</span>
          </li>}
        </ul>
      }
    </div>
  );
};