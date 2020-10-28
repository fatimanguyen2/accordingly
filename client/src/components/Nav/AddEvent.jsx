import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import LocationSearchInput from './LocationSearchInput'
const classnames = require('classnames');

export const AddEvent = (props) => {

  const [input, setInput] = useState({})
  const [repeats, setRepeat] = useState([
    {
      "id": 1,
      "type_of": "weekly",
      "initial": "2020-03-09T04:00:00.000Z",
      "interval": 2
    },
    {
      "id": 2,
      "type_of": "weekly",
      "initial": "2020-03-10T04:00:00.000Z",
      "interval": 2
    },
    {
      "id": 3,
      "type_of": "weekly",
      "initial": "2020-03-11T04:00:00.000Z",
      "interval": 1
    },
    {
      "id": 4,
      "type_of": "weekly",
      "initial": "2020-03-12T04:00:00.000Z",
      "interval": 1
    },
    {
      "id": 5,
      "type_of": "weekly",
      "initial": "2020-03-13T04:00:00.000Z",
      "interval": 1
    }
  ]);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleConfirm = (address) => setInput({
    ...input,
    "destination": address
  })

  //year max=99
  //month max=12
  //weekly max=52
  //daily max=99

  return (
    <form>
      <label htmlFor="entry">Title</label>
      <input type="text" name="entry" id="entry" placeholder="Add Title" onChange={handleInputChange} required></input>
      <LocationSearchInput onConfirm={handleConfirm}/>
      <label htmlFor="start_date">Start Date</label>
      <input type="date" name="start_date" id="start_date" onChange={handleInputChange} required></input>
      <label htmlFor="start_time">Start Time</label>
      <input type="time" name="start_time" id="start_time" onChange={handleInputChange} required></input>
      <label htmlFor="end_date">End Date</label>
      <input type="date" name="end_date" id="end_date" onChange={handleInputChange} required></input>
      <label htmlFor="end_time">End Time</label>
      <input type="time" name="end_time" id="end_time" onChange={handleInputChange} required></input>
      <ul>
        {repeats.map(ele => {
          return <li key={ele.id}>
            Every 
            <label htmlFor="interval_count">Repeat Count</label>
            <input type="number" min="0" max="12" name="interval_count" id="interval_count" onChange={handleInputChange} required></input>
            <label for="interval_type">Repeat Type</label>
            <select name="interval_type" id={`interval_type_${ele.id}`}>
              <option value="">None</option>
              <option value="day">Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </li>
        })}
      </ul>

      <button id="add_repeat" onClick={(event) => {
        event.preventDefault()
        console.log(event.target)
      }}><FontAwesomeIcon icon={faPlus} /></button>
      
      <button onClick={(event) => {
        event.preventDefault()
        console.log(event.target)
        props.onSubmit('Data Here')
      }}>Save</button>
    </form>
  );
};