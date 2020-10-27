import React, { useState } from 'react';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form autoComplete='off' onSubmit={event => event.preventDefault()}>
      <label htmlFor='email'>Email:</label>
      <input id='email' value={email} onChange={event => setEmail(event.target.value)} /><br />
      <label htmlFor='password'>Password:</label>
      <input id='password' value={password} onChange={event => setPassword(event.target.value)} type='password'/>
    </form>
  )
};