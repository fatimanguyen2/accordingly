import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import useEndlessForm from '../../hooks/useEndlessForm';
import { getDateFromTimestamp } from '../../helpers/selectors';

import LocationSearchInput from './LocationSearchInput'
const classnames = require('classnames');

export const AddEvent = (props) => {

  //year max=99
  //month max=12
  //weekly max=52
  //daily max=99

  const entry = props.eventToEdit.entry || '';
  const start_date = getDateFromTimestamp(props.eventToEdit.entry_id !== undefined ? props.eventToEdit.next_event.start_time : '');
  const end_date = getDateFromTimestamp(props.eventToEdit.entry_id !== undefined ? props.eventToEdit.next_event.end_time : '');;
  const start_hour = props.eventToEdit.start_hour || '';
  const end_hour = props.eventToEdit.end_hour || '';
  const destination = props.eventToEdit.entry_id !== undefined ? props.eventToEdit.next_event.destination.x : '';
  

  const { repeats, handleInputChange, handleAddress, addRepeat, removeRepeat } = useEndlessForm({
    entry,
    start_date,
    end_date,
    start_hour,
    end_hour,
  });

  return (
    <form>
      <label htmlFor="entry">Title</label>
      <input type="text" name="entry" id="entry" placeholder="Add Title" defaultValue={entry} onChange={handleInputChange} required></input>
      <LocationSearchInput onChange={handleAddress} destination={destination}/>
      <label htmlFor="start_date">Start Date</label>
      <input type="date" name="start_date" id="start_date" defaultValue={start_date} onChange={handleInputChange} required></input>
      <label htmlFor="start_hour">Start Time</label>
      <input type="time" name="start_hour" id="start_hour" defaultValue={start_hour} onChange={handleInputChange} required></input>
      <label htmlFor="end_date">End Date</label>
      <input type="date" name="end_date" id="end_date" defaultValue={end_date} onChange={handleInputChange} required></input>
      <label htmlFor="end_time">End Time</label>
      <input type="time" name="end_time" id="end_time" defaultValue={end_hour} onChange={handleInputChange} required></input>
      <ul>
        {repeats.map(ele => {
          return <li key={ele.html_id}>
            Every 
            <label htmlFor={`interval_count_${ele.html_id}`}>Repeat Count</label>
            <input type="number" min="1" max="12" name={`interval_count_${ele.html_id}`} id={`interval_count_${ele.html_id}`} onChange={handleInputChange} required></input>
            <label htmlFor={`interval_type_${ele.html_id}`}>Repeat Type</label>
            <select name={`interval_type_${ele.html_id}`} id={`interval_type_${ele.html_id}`} onChange={handleInputChange}>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="" disabled>----</option>
              <option value="0">Monday</option>
              <option value="1">Tuesday</option>
              <option value="2">Wednesday</option>
              <option value="3">Thursday</option>
              <option value="4">Friday</option>
              <option value="5">Saturday</option>
              <option value="6">Sunday</option>
            </select>
            <button id={`delete_repeat_${ele.html_id}`} onClick={(e) => removeRepeat(e, ele.html_id)}><FontAwesomeIcon icon={faTimes} /></button>
          </li>
        })}
      </ul>

      <button id="add_repeat" onClick={addRepeat}><FontAwesomeIcon icon={faPlus} /></button>
      
      <button onClick={(event) => {
        // event.preventDefault()
        console.log(event.target)
        props.onSubmit('Data Here')
      }}>Save</button>
    </form>
  );
};