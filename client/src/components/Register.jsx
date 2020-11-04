import React, { Fragment } from 'react';
import { Redirect } from "react-router-dom";

import './Register.scss';

import { Button } from './Button';
import { useControlledInput } from '../hooks/useControlledInput';
import useEndlessForm from '../hooks/useEndlessForm';
import LocationSearchInput from './LocationSearchInput';

export const Register = props => {
  const email = useControlledInput('');
  const password = useControlledInput('');
  const passwordConfirmation = useControlledInput('');
  const { input, handleAddress } = useEndlessForm('');

  return (
    <Fragment>
      {!props.loggedIn ?
        <div className='register'>
          <h1 className='register__title'>Register</h1>

          <form className='form' autoComplete='off' onSubmit={event => event.preventDefault()}>

            <div className='register__email'>
              <label htmlFor='email'>Email:</label>
              <input id='email' {...email} />
            </div>

            <div className='register__password'>
              <label htmlFor='password'>Password:</label>
              <input id='password' {...password} input='password' />
            </div>

            <div className='register__confirm-password'>
              <label htmlFor='passwordConfirmation'>Confirm Password:</label>
              <input id='passwordConfirmation' {...passwordConfirmation} input='password' />
            </div>

            <div className='register__address'>
              {/* <FontAwesomeIcon className='register__address__location-icon' icon={faMapMarkerAlt} /> */}
              <LocationSearchInput onChange={(e) => {
                handleAddress(e);
              }} destination={''} />
            </div>
            <p className='register__address__desc'>We use your home location as the starting point of the day to predict and prepare your personalized recommendations.</p>
          </form>
          <Button onClick={props.login}>Register</Button>
        </div> :
        <Redirect to='/' />
      }
    </Fragment>
  );
};