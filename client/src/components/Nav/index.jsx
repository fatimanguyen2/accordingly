import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';

import { NavMenu } from './NavMenu';
import { AddEvent } from './AddEvent';

const classnames = require('classnames');

export const Nav = (props) => {

  const [collapse, setCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(true);

  return (
    <div>
      <button
        onClick={() => setCollapse(state => !state)}
        className={
          classnames('button', {
            'button--collapse': collapse,
            'button--expand': !collapse,
          })
        }>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {!collapse &&
        <NavMenu
          onSelect={props.onSelect}
          loggedIn={props.loggedIn}
          time={props.time}
          logout={props.logout}
        />
      }

      {props.loggedIn &&
        <button
          onClick={() => setAddCollapse(state => !state)}
          className={
            classnames('button', {
              'button--collapse': addCollapse,
              'button--expand': !addCollapse || props.eventToEdit.entry_id,
            })
          }>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
      {(!addCollapse || props.eventToEdit.entry_id) &&
        <AddEvent onSubmit={props.onSubmit} eventToEdit={props.eventToEdit} />
      }
    </div>
  );
};