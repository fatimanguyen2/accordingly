import React, { Fragment, useState } from 'react';
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import { Button } from './Button';
import { useControlledInput } from '../hooks/useControlledInput';
export const Register = props => {
  const email = useControlledInput('');
  const password = useControlledInput('');
  const passwordConfirmation = useControlledInput('');
  const address = useControlledInput('');
  const startOfDay = useControlledInput('');

  return (
    <Fragment>
      {!props.loggedIn ?
        <div>
          <h1>Register</h1>
          <form autoComplete='off' onSubmit={event => event.preventDefault()}>
            <label htmlFor='email'>Email:</label>
            <input id='email' {...email} /> <br />

            <label htmlFor='password'>Password:</label>
            <input id='password' {...password} input='password' /> <br />

            <label htmlFor='passwordConfirmation'>Confirm Password:</label>
            <input id='passwordConfirmation' {...passwordConfirmation} input='password' /> <br />

            <label htmlFor='address'><FontAwesomeIcon icon={faMapMarkerAlt} />Home:</label>
            <input id='address' {...address} /><br />
            <p>We use your home location as the starting point of the day to predict and prepare your personalized suggestions.</p>

            <label htmlFor='startOfDay'><FontAwesomeIcon icon={faClock} />Start of Day:</label>
            <input id='startOfDay' {...startOfDay} type='time' />
            <p>The start of day setting determines when we will send you the daily notification for what to bring and help us know when you are getting ready at home.</p>
          </form>
          <Button onClick={props.login}>Register</Button>
        </div> :
        <Redirect to='/' />
      }
    </Fragment>
  );
};