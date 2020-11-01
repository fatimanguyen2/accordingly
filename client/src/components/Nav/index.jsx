import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Nav.scss';

import { NavMenu } from './NavMenu';
import { AddEvent } from './AddEvent';

const classnames = require('classnames');

export const Nav = props => {

  const [menuCollapse, setMenuCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(true);

  const toggleMenu = () => {
    setMenuCollapse(state => !state);
  };

  const toggleAdd = () => {
    setAddCollapse(state => !state);
  };

  const openAdd = () => {
    setAddCollapse(false);
  };

  useEffect(() => {
    if (props.eventToEdit.entry_id) {
      openAdd();
    }
  }, [props.eventToEdit]);

  const closeMenu = () => {
    setMenuCollapse(true);
  };

  const closeAdd = () => {
    setAddCollapse(true);
    props.clearToEdit();
  };

  const closeAll = () => {
    closeAdd();
    closeMenu();
  }

  return (
    <div className='nav'>
      <div className='nav-container'>
        {(addCollapse || !props.loggedIn) &&
          <Fragment>
            <button
              onClick={() => {
                toggleMenu();
                closeAdd();
              }}
              className={
                classnames('nav-menu', 'button', {
                  'button--collapse': menuCollapse,
                  'button--expand': !menuCollapse,
                })
              }>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div onClick={() => (menuCollapse && toggleMenu())} className={
                classnames('nav-menu', 'menu-shape', {
                  'menu-shape--collapse': menuCollapse,
                  'menu-shape--expand': !menuCollapse,
                })
              }></div>
          </Fragment>
        }
        {!menuCollapse &&
          <Fragment>
            <NavMenu
              onSelect={props.onSelect}
              closeMenu={closeMenu}
              loggedIn={props.loggedIn}
              time={props.time}
              logout={props.logout}
            />
            <button className='blur-trigger' onClick={closeAll}>BLUR TRIGGER, MAKE ME INVISIBLE AND TAKE UP THE REST OF THE SCREEN!</button>
          </Fragment>
        }
      </div>

      <div className='add-container'>
        {props.loggedIn && menuCollapse &&
          <Fragment>
            <button
              onClick={() => {
                if (props.eventToEdit.entry_id) {
                  closeAdd();
                } else {
                  toggleAdd();
                }
                props.clearToEdit();
              }}
              className={
                classnames('add-menu', 'button', {
                  'button--collapse': addCollapse,
                  'button--expand': !addCollapse || props.eventToEdit.entry_id,
                })
              }>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <div onClick={() => (addCollapse && toggleAdd())} className={
              classnames('add-menu', 'menu-shape', {
                'menu-shape--collapse': addCollapse,
                'menu-shape--expand': !addCollapse,
              })
            }></div>

          </Fragment>
        }
        {(!addCollapse || props.eventToEdit.entry_id) && props.loggedIn &&
          <Fragment>
            <AddEvent onSubmit={props.onSubmit} onEdit={props.onEdit} eventToEdit={props.eventToEdit} closeAdd={closeAdd} />
            <button className='blur-trigger' onClick={closeAll}>BLUR TRIGGER, MAKE ME INVISIBLE AND TAKE UP THE WHOLE REST OF THE SCREEN!</button>
          </Fragment>
        }
      </div>
    </div>
  );
};