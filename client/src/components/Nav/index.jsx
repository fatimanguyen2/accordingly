import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Nav.scss';

import { NavMenu } from './NavMenu';
import { AddEvent } from './AddEvent';

const classnames = require('classnames');

export const Nav = props => {

  const [menuCollapse, setMenuCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(true);

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
      <div>
        <button
          onClick={() => {
            setMenuCollapse(state => !state);
            closeAdd();
          }}
          className={
            classnames('button', {
              'button--collapse': menuCollapse,
              'button--expand': !menuCollapse,
            })
          }>
          <FontAwesomeIcon icon={faBars} />
        </button>
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

      <div>
        {props.loggedIn &&
          <button
            onClick={() => {
              if (props.eventToEdit.entry_id) {
                setAddCollapse(state => true);
              } else {
                setAddCollapse(state => !state);
              }
              props.clearToEdit();
            }}
            className={
              classnames('button', {
                'button--collapse': addCollapse,
                'button--expand': !addCollapse || props.eventToEdit.entry_id,
              })
            }>
            <FontAwesomeIcon icon={faPlus} />
          </button>
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