import React, { useState } from 'react';
import { Button } from '../Button';


export const Form = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='form'>
      <form autoComplete='off' onSubmit={event => event.preventDefault()}>
        <div className='form__email'>
          <label htmlFor='email'>Email:</label>
          <input
          id='email'
          value={email}
          placeholder='raccoon@gmail.com'
          onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className='form__password'>
          <label htmlFor='password'>Password:</label>
          <input
          id='password'
          value={password}
          placeholder='********'
          onChange={event => setPassword(event.target.value)} type='password'
          />
        </div>
      </form>
      <Button onClick={props.login}>Login</Button>
      <Button onClick={props.demo}>Demo</Button>
    </div>

  )
};