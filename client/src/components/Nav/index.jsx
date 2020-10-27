import React, { useState } from 'react';
import { Menu } from './menu';
import { Add } from './add';

const classnames = require('classnames');

export const Nav = (props) => {

  const [collapse, setCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(true);

  return (
    <div>
      <button
        onClick={() => setCollapse(state => {
          return !state;
        })}
        className={
          classnames('button', {
          'button--collapse':collapse,
          'button--expand':!collapse,
          })
        }>
          Menu
      </button>
      {!collapse &&
        <Menu onSelect={props.onSelect} loggedIn={props.loggedIn} time={props.time}/>
      }
      {props.loggedIn &&
      <button
          onClick={() => setAddCollapse(state => {
            return !state;
          })}
          className={
            classnames('button', {
            'button--collapse':addCollapse,
            'button--expand':!addCollapse,
            })
          }>
            Add
        </button>
      }
      {!addCollapse &&
        <Add onSubmit={props.onSubmit}/>
      }
    </div>
  );
};