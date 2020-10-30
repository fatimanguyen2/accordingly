import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";
import { Button } from './Button';
import useEndlessForm from '../hooks/useEndlessForm';
import LocationSearchInput from './LocationSearchInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export const Settings = props => {
  // const [address, setAddress] = useState('');
  const [startOfDay, setStartOfDay] = useState('');
  const [showButton, setShowButton] = useState(false);
  const raw_address = `${props.address.address}, ${props.address.city}`

  const handleChange = (event, cb) => {
    cb(event.target.value);
    setShowButton(true);
  };

  const handleSave = () => {
    props.updateAddress(input.raw_address);
    setShowButton(false);
  };

  const { input, handleInputChange, handleAddress } = useEndlessForm({
    raw_address,
  });

  return (
    <Fragment>
      {props.loggedIn ?
        <div>
          <h1>Settings</h1>
          <form autoComplete='off' onSubmit={event => event.preventDefault()}>

            {/* <label htmlFor='address'><FontAwesomeIcon icon={faMapMarkerAlt} /> Home:</label>
            <input id='address' value={address || props.address.x} onChange={event => handleChange(event, setAddress)} /><br />
            <p>We use your home location as the starting point of the day to predict and prepare your personalized recommendations.</p> */}

            <LocationSearchInput onChange={() => {
              handleAddress();
              setShowButton(true);
            }} destination={raw_address}/>
            <p>We use your home location as the starting point of the day to predict and prepare your personalized recommendations.</p>

            <label htmlFor='startOfDay'><FontAwesomeIcon icon={faClock} /> Start of Day:</label>
            <input id='startOfDay' value={startOfDay} onChange={event => handleChange(event, setStartOfDay)} type='time' />
            <p>The start of day setting determines when we will send you the daily notification for what to bring and help us know when you are getting ready at home.</p>

          </form>

          {showButton && <Button onClick={null}>Save</Button>}

        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};