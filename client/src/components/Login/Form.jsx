import React, { useState } from 'react';
import { Button } from '../Button';


export const Form = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form autoComplete='off' onSubmit={event => event.preventDefault()}>
        <label htmlFor='email'>Email:</label>
        <input id='email' value={email} onChange={event => setEmail(event.target.value)} /><br />
        <label htmlFor='password'>Password:</label>
        <input id='password' value={password} onChange={event => setPassword(event.target.value)} type='password'/>
      </form>
        <Button onClick={props.login}>Login</Button>
    </div>

  )
};