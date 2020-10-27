import React from 'react';
import moment from 'moment';
const classnames = require('classnames');

export const Menu = (props) => {

  return (
    <div>
      <button onClick={() => props.onSelect('home')} className={classnames('link', {'link--active':props.view === 'home'})}>{props.loggedIn ? 'Home' : 'Login'}</button>
      {!props.loggedIn && <button onClick={() => props.onSelect('register')}>Register</button>}
      {props.loggedIn && <button onClick={() => props.onSelect('schedule')}>Schedule</button>}
      <button>About</button>
      {props.loggedIn && <button>Settings</button>}
      {props.loggedIn && <button>
        Refresh
        <span> {moment(props.time).fromNow()}</span>
      </button>}
    </div>
  );
};