import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
const classnames = require('classnames');

export const NavMenu = (props) => {

  return (
    <div>
      <Link to='/' onClick={() => props.onSelect('home')} className={classnames('link', {'link--active':props.view === 'home'})}>{props.loggedIn ? 'Home' : 'Login'}</Link>
      {!props.loggedIn && <Link to='/register' onClick={() => props.onSelect('register')}>Register</Link>}
      {props.loggedIn && <Link to='/schedule' onClick={() => props.onSelect('schedule')}>Schedule</Link>}
      <Link to='/about'>About</Link>
      {props.loggedIn && <Link to='/settings'>Settings</Link>}
      {props.loggedIn && <button onClick={() => props.onSelect('refresh')}>
        Refresh
        <span> {moment(props.time).fromNow()}</span>
      </button>}
    </div>
  );
};