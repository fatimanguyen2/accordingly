import React, { Fragment, useState } from 'react';
import {Button} from './Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export const Settings = props => {
  const [address, setAddress] = useState('');
  const [startOfDay, setStartOfDay] = useState('');

  return (
    <Fragment>
      {props.loggedIn ?
        <div>
          <h1>Settings</h1>
          <form autoComplete='off' onSubmit={event => event.preventDefault()}>
            <label for='address'><FontAwesomeIcon icon={faMapMarkerAlt}/>Home:</label>
            <input id='address' value={address} onChange={event => setAddress(event.target.value)}/><br/>
            <label for='startOfDay'><FontAwesomeIcon icon={faClock}/>Start of Day:</label>
            <input id='startOfDay' value={startOfDay} onChange={event => setStartOfDay(event.target.value)} type='time'/>
          </form>
          {/* <Button onClick={}>Save</Button> */}

        </div> :
        <div><h1>Please register/log in.</h1></div>
      }
    </Fragment>
  );
};