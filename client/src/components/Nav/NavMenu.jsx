import React, { Fragment } from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.scss';

const classnames = require('classnames');
export const NavMenu = (props) => {
  const location = useLocation();
  // console.log(location);
  return (
    <Fragment>
      <ul className='nav-menu'>
        {props.loggedIn ?
          <Fragment>
            <li><Link to='/' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/' })}>Home</Link></li>
            <li><Link to='/schedule' onClick={() => props.closeMenu()}>Schedule</Link></li>
            <li><Link to='/settings' onClick={() => props.closeMenu()}>Settings</Link></li>
            <li><Link to='/about' onClick={() => props.closeMenu()}>About</Link></li>
            <li>
              <Link to={location.pathname} onClick={() => {
                  props.onSelect('nav menu refresh selected');
                  // props.closeMenu();
                }}>
                Refresh <span>{moment(props.time).fromNow()}</span>
              </Link>
            </li>
            <li><Link to='/' onClick={() => {
              props.logout();
              props.closeMenu();
            }}>Logout</Link></li>
          </Fragment> :
          <Fragment>
            <li><Link to='/login' onClick={() => props.closeMenu()}>Login</Link></li>
            <li><Link to='/register' onClick={() => props.closeMenu()}>Register</Link></li>
            <li><Link to='/about'>About</Link></li>
          </Fragment>
        }
      </ul>
      {/* <div className='menu-shape'></div> */}
    </Fragment>
  );
};