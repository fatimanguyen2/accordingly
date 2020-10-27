import React from 'react';
import { Link } from 'react-router-dom';

import { LogoRing } from './LogoRing';
import { Form } from './Form';

export const Login = props => {
  return (
    <div>
      <LogoRing />
      <Form login={props.login} />
      <p><Link to='/register'>Register</Link></p>
    </div>
  );
};