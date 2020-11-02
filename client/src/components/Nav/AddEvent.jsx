import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import useEndlessForm from '../../hooks/useEndlessForm';
import { getDateFromTimestamp, giveHTMLID, validateObj, addSeconds, removeSeconds, getHourFromTime } from '../../helpers/selectors';
import moment from 'moment';
import './AddEvent.scss';

import LocationSearchInput from '../LocationSearchInput'
const classnames = require('classnames');

export const AddEvent = (props) => {

  //year max=99
  //month max=12
  //weekly max=52
  //daily max=99
  //POST /api/users/:user_id/entries/new
  //PUT /api/users/:user_id/entries/:id

  const entry_id = props.eventToEdit.entry_id || null;
  const next_event = props.eventToEdit.next_event || null;
  const entry = props.eventToEdit.entry || '';
  const start_date = getDateFromTimestamp(entry_id ? (next_event ? props.eventToEdit.next_event.start_time : props.eventToEdit.start_time) : '');
  const end_date = getDateFromTimestamp(entry_id ? (next_event ? props.eventToEdit.next_event.end_time : props.eventToEdit.end_time) : '');;
  const start_hour = next_event ? removeSeconds(props.eventToEdit.start_hour) : removeSeconds(getHourFromTime(props.eventToEdit.start_time)) || '';
  const end_hour = next_event? removeSeconds(props.eventToEdit.end_hour) : removeSeconds(getHourFromTime(props.eventToEdit.end_time)) || '';
  const raw_address = entry_id ? (next_event ? `${props.eventToEdit.next_event.address}, ${props.eventToEdit.next_event.city}` : `${props.eventToEdit.address}, ${props.eventToEdit.city}`) : '';
  const recurrences = giveHTMLID(props.eventToEdit.recurrences || []).map(ele => ele.type_of === 'weekly' ? ({...ele, type_of: moment(ele.initial).format('e')}) : ele);

  const { input, repeats, handleInputChange, handleAddress, addRepeat, setRepeat, removeRepeat } = useEndlessForm({
    entry_id,
    entry,
    start_date,
    end_date,
    start_hour,
    end_hour,
    recurrences,
    raw_address,
  });

  return (
    <form className='add-menu' onSubmit={(e) => e.preventDefault()} >
      <label htmlFor="entry">Title</label>
      <input type="text" name="entry" id="entry" placeholder="Add Title" defaultValue={entry} onChange={handleInputChange} required></input>
      <div className='location'>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <LocationSearchInput onChange={handleAddress} destination={raw_address}/>
      </div>
      <div className='start-time'>
        <label htmlFor="start_date">Start Date</label>
        <input type="date" name="start_date" id="start_date" defaultValue={start_date} onChange={handleInputChange} required></input>
        <label htmlFor="start_hour">Start Time</label>
        <input type="time" name="start_hour" id="start_hour" defaultValue={start_hour} onChange={handleInputChange} required></input>
      </div>
      <div className='end-time'>
        <label htmlFor="end_date">End Date</label>
        <input type="date" name="end_date" id="end_date" defaultValue={end_date} onChange={handleInputChange} required></input>
        <label htmlFor="end_hour">End Time</label>
        <input type="time" name="end_hour" id="end_hour" defaultValue={end_hour} onChange={handleInputChange} required></input>
      </div>
      <ul>
        {repeats.map(ele => {
          // console.log(ele.type_of);
          return <li key={ele.html_id}>
            <p>Every</p> 
            <label htmlFor={`interval_count_${ele.html_id}`}>Repeat Count</label>
            <input type="number" min="1" max="12" name={`interval_count_${ele.html_id}`} id={`interval_count_${ele.html_id}`} defaultValue={ele.interval || 0} onChange={(e) => {
                //update the repeat state with correct repeat type
                const value = e.currentTarget.value;
                handleInputChange(e)
                setRepeat(state => {
                  return state.map(repeat => {
                    if (repeat.html_id === ele.html_id) {
                      return {...repeat, interval: value}
                    } else {
                      return repeat;
                    }
                  })
                })
              }} required></input>
            <label htmlFor={`interval_type_${ele.html_id}`}>Repeat Type</label>
            <select name={`interval_type_${ele.html_id}`}
              id={`interval_type_${ele.html_id}`}
              defaultValue={ele.type_of}
              onChange={(e) => {
                //update the repeat state with correct repeat type
                const value = e.currentTarget.value;
                handleInputChange(e)
                setRepeat(state => {
                  return state.map(repeat => {
                    if (repeat.html_id === ele.html_id) {
                      return {...repeat, type_of: value}
                    } else {
                      return repeat;
                    }
                  })
                })
              }}>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="" disabled>----</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="0">Sunday</option>
            </select>
            <button id={`delete_repeat_${ele.html_id}`} className="button button--delete--repeat" onClick={(e) => removeRepeat(e, ele.html_id)}><FontAwesomeIcon icon={faTimes} /></button>
          </li>
        })}
      </ul>

      <button id="add_repeat" className="button button--repeat" onClick={addRepeat}><FontAwesomeIcon icon={faPlus} /></button>
      
      <button 
        className="button button--save"
        onClick={() => {
          // event.preventDefault()
          // event.stopPropagation();
          // event.nativeEvent.stopImmediatePropagation();
          // console.log(event.target)
          const eventObj = {...input, recurrences: repeats, start_hour: addSeconds(input.start_hour), end_hour: addSeconds(input.end_hour)};
          const pass = validateObj(eventObj, [ 'entry', 'raw_address', 'start_date', 'end_date', 'start_hour', 'end_hour' ]);
          pass && (input.entry_id ? props.onEdit(eventObj) : props.onSubmit(eventObj));
          pass && props.closeAdd();
        }}>
        {entry_id ? 'Edit' : 'Add'}
      </button>
    </form>
  );
};