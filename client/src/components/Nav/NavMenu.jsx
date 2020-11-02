import React, { Fragment, useEffect } from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.scss';

const classnames = require('classnames');
export const NavMenu = (props) => {
  const location = useLocation();
  // console.log(location);
  let time = moment(props.time).fromNow();

  useEffect(() => {
    time = moment(props.time).fromNow();
  }, [props.time]);

  return (
    <Fragment>
      <ul className='nav-menu'>
        {props.loggedIn ?
          <Fragment>
            <li><Link to='/' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/' })}>Home</Link></li>
            <li><Link to='/schedule' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/schedule' })}>Schedule</Link></li>
            <li><Link to='/settings' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/settings' })}>Settings</Link></li>
            <li><Link to='/about' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/about' })}>About</Link></li>
            <li>
              <Link to={location.pathname} onClick={() => {
                  props.onSelect('nav menu refresh selected');
                  // props.closeMenu();
                }}>
                Refresh <span>{time}</span>
              </Link>
            </li>
            <li><Link to='/login' onClick={() => {
              props.logout();
              props.closeMenu();
            }}>Logout</Link></li>
          </Fragment> :
          <Fragment>
            <li><Link to='/login' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/login' })}>Login</Link></li>
            <li><Link to='/register' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/register' })}>Register</Link></li>
            <li><Link to='/about' onClick={() => props.closeMenu()} className={classnames('link', { 'link--active': location.pathname === '/about' })}>About</Link></li>
          </Fragment>
        }
      </ul>
      {/* <div className='menu-shape'></div> */}
    </Fragment>
  );
};