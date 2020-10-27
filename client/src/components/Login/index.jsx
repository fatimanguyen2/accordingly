import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { LogoRing } from './LogoRing';
import { Form } from './Form';

export const Login = props => {
  return (
    <Fragment>
      {!props.loggedIn ?
        <div>
          <LogoRing />
          <Form login={props.login} />
          <p><Link to='/register'>Register</Link></p>
        </div> :
        <Redirect to='/'/>
      }
    </Fragment>
  );
};