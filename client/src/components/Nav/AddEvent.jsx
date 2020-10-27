import React, { useState } from 'react';
import moment from 'moment';
import LocationSearchInput from './LocationSearchInput'
const classnames = require('classnames');

export const AddEvent = (props) => {

  const [input, setInput] = useState({})
  const [repeats, setRepeat] = useState([1, 2, 3]);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return (
    <form>
      <label for="entry">Title</label>
      <input type="text" name="entry" id="entry" placeholder="Add Title" onChange={handleInputChange} required></input>
      <label for="destination">Location</label>
      <input type="text" name="destination" id="destination" placeholder="Add Location" onChange={handleInputChange} required></input>
      <LocationSearchInput/>
      <label for="start_date">Start Date</label>
      <input type="date" name="start_date" id="start_date" onChange={handleInputChange} required></input>
      <label for="start_time">Start Time</label>
      <input type="time" name="start_time" id="start_time" onChange={handleInputChange} required></input>
      <label for="end_date">End Date</label>
      <input type="date" name="end_date" id="end_date" onChange={handleInputChange} required></input>
      <label for="end_time">End Time</label>
      <input type="time" name="end_time" id="end_time" onChange={handleInputChange} required></input>

      {repeats.map(ele => {
        return <li key={ele.id}>Item</li>
      })}
      
      <button onClick={(event) => {
        event.preventDefault()
        console.log(event.target)
        props.onSubmit('Data Here')
      }}>Save</button>
    </form>
  );
};