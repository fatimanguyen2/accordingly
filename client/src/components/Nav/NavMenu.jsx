import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const classnames = require('classnames');

export const NavMenu = (props) => {

  return (
    <ul>
      <li><Link to='/' onClick={() => props.onSelect('home')} className={classnames('link', {'link--active':props.view === 'home'})}>{props.loggedIn ? 'Home' : 'Login'}</Link></li>
      {!props.loggedIn && <li><Link to='/register' onClick={() => props.onSelect('register')}>Register</Link></li>}
      {props.loggedIn && <li><Link to='/schedule' onClick={() => props.onSelect('schedule')}>Schedule</Link></li>}
      <li><Link to='/about'>About</Link></li>
      {props.loggedIn && <li><Link to='/settings'>Settings</Link></li>}
      {props.loggedIn && <li><button onClick={() => props.onSelect('refresh')}>
        Refresh 
      </button>
      <span> {moment(props.time).fromNow()}</span>
      </li>}
    </ul>
  );
};