import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { LogoRing } from './LogoRing';
import { Form } from './Form';

export const Login = props => {
  return (
    <div>
      <LogoRing />
      <Form/>
      <Button onClick={() => { }}>Login</Button>
      <p><Link to='/register'>Register</Link></p>
    </div>
  );
};