import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const classnames = require('classnames');

export const NavMenu = (props) => {

  return (
    <ul>
      {props.loggedIn ?
        <Fragment>
          <li><Link to='/' onClick={() => props.onSelect('home')} className={classnames('link', { 'link--active': props.view === 'home' })}>Home</Link></li>
          <li><Link to='/schedule' onClick={() => props.onSelect('schedule')}>Schedule</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li>
            <button onClick={() => props.onSelect('refresh')}>
              Refresh <span>~{moment(props.time).fromNow()}</span>
            </button>
          </li>
          <li><button onClick={props.logout}>Logout</button></li>
        </Fragment> :
        <Fragment>
          <li><Link to='/login' onClick={() => props.onSelect('login')}>Login</Link></li>
          <li><Link to='/register' onClick={() => props.onSelect('register')}>Register</Link></li>
          <li><Link to='/about'>About</Link></li>
        </Fragment>
      }
    </ul>
  );
};