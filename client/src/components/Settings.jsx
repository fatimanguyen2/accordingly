import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";
import {Button} from './Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export const Settings = props => {
  const [address, setAddress] = useState(props.address.x);
  const [startOfDay, setStartOfDay] = useState('');
  const [showButton, setShowButton] = useState(false);

  const handleChange = (event, cb) => {
    cb(event.target.value);
    setShowButton(true);
  };

  return (
    <Fragment>
      {props.loggedIn ?
        <div>
          <h1>Settings</h1>
          <form autoComplete='off' onSubmit={event => event.preventDefault()}>
            <label htmlFor='address'><FontAwesomeIcon icon={faMapMarkerAlt}/>Home:</label>
            <input id='address' value={address} onChange={event => handleChange(event, setAddress)}/><br/>
            <label htmlFor='startOfDay'><FontAwesomeIcon icon={faClock}/>Start of Day:</label>
            <input id='startOfDay' value={startOfDay} onChange={event => handleChange(event, setStartOfDay)} type='time'/>
          </form>
          {showButton && <Button onClick={() => console.log('axios update')}>Save</Button>}

        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};