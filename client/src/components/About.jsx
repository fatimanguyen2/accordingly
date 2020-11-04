import React from 'react';
import './About.scss';

export const About = () => {
  return (
    <div className='about'>
      <div className='logo-ring'><h1>Accordingly</h1></div>
      <h1>About Us</h1>
      <p>Site made by...</p>
      <h1 className='about__team-name'>The Loaded Raccoons!</h1>
    </div>
  );
};