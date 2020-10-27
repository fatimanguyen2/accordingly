import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
const classnames = require('classnames');

export const NavMenu = (props) => {

  const [collapse, setCollapse] = useState(false);

  const onClick = () => {
    props.handleCheck(props.id, props.type);
  };

  return (
    <button
      className={
        classnames('button', {
          'button--collapse': collapse,
          'button--expand': !collapse,
        })
      }>
      {!collapse &&
        <nav>
          <ul>
            {props.loggedIn ? <li>< Link to='/'>Home</Link></li> : <li>< Link to='/login'>Login</Link></li>}
            {!props.loggedIn && <li>< Link to='/register'>Register</Link></li>}
            {props.loggedIn && <li>< Link to='/schedule'>Schedule</Link></li>}
            <li>< Link to='/about'>About</Link></li>
            {props.loggedIn && <li>< Link to='/settings'>Settings</Link></li>}
            {props.loggedIn && <li>
              Refresh
            <span>{moment(1603740043000).fromNow()}</span>
            </li>}
          </ul>
        </nav>
      }
    </button>
  );
};