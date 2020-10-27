import React from 'react';

import { Button } from '../Button';
import { LogoRing } from './LogoRing';
import { Form } from './Form';

export const Login = props => {
  return (
    <div>
      <LogoRing />
      <Button onClick={() => { }}>Login</Button>
    </div>
  );
};