import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

import './Settings.scss';
import { Button } from './Button';
import useEndlessForm from '../hooks/useEndlessForm';
import LocationSearchInput from './LocationSearchInput';


export const Settings = props => {
  // const [startOfDay, setStartOfDay] = useState(''); //STRETCH
  const raw_address = `${props.address.address}, ${props.address.city}`
  const [showButton, setShowButton] = useState(false);

  const handleSave = () => {
    props.updateAddress(input.raw_address);
    setShowButton(false);
  };

  const { input, handleAddress } = useEndlessForm({
    raw_address,
  });

  return (
    <Fragment>
      {props.loggedIn ?
        <div className='settings'>
          <h1 className='settings__title'>Settings</h1>
          <form autoComplete='off' onSubmit={event => event.preventDefault()}>

            <div className='settings__home-location'>
              <FontAwesomeIcon className='settings__location-icon' icon={faMapMarkerAlt} />
              <LocationSearchInput onChange={(e) => {
                handleAddress(e);
                setShowButton(true);
              }} destination={raw_address} />
            </div>

            <p className='settings__desc'>We use your home location as the starting point of the day to predict and prepare your personalized recommendations.</p>

            {/* <label htmlFor='startOfDay'><FontAwesomeIcon icon={faClock} /> Start of Day:</label>
            <input id='startOfDay' value={startOfDay} onChange={event => handleChange(event, setStartOfDay)} type='time' />
            <p>The start of day setting determines when we will send you the daily notification for what to bring and help us know when you are getting ready at home.</p> */}

          </form>

          {showButton && <Button onClick={handleSave}>Save</Button>}

        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};