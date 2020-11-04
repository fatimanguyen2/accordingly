import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import useEndlessForm from '../../hooks/useEndlessForm';
import { getDateFromTimestamp, giveHTMLID, validateObj, addSeconds, removeSeconds, getHourFromTime, roundUp } from '../../helpers/selectors';
import moment from 'moment';
import './AddEvent.scss';
import LocationSearchInput from '../LocationSearchInput'

export const AddEvent = (props) => {

  //year max=99
  //month max=12
  //weekly max=52
  //daily max=99
  //POST /api/users/:user_id/entries/new
  //PUT /api/users/:user_id/entries/:id
  // console.log('time: ', getDateFromTimestamp(moment().format()));

  const entry_id = props.eventToEdit.entry_id || null;
  const next_event = props.eventToEdit.next_event || null;
  const entry = props.eventToEdit.entry || '';
  const start_date = getDateFromTimestamp(entry_id ? (next_event ? props.eventToEdit.next_event.start_time : props.eventToEdit.start_time) : moment().format());
  const end_date = getDateFromTimestamp(entry_id ? (next_event ? props.eventToEdit.next_event.end_time : props.eventToEdit.end_time) : moment().format());;
  const start_hour = next_event ? removeSeconds(props.eventToEdit.start_hour) : removeSeconds(getHourFromTime(props.eventToEdit.start_time)) || roundUp(moment(), 'hour').format('HH:mm');
  const end_hour = next_event? removeSeconds(props.eventToEdit.end_hour) : removeSeconds(getHourFromTime(props.eventToEdit.end_time)) || roundUp(moment(), 'hour').add(1, 'hour').format('HH:mm');
  const raw_address = entry_id ? (next_event ? `${props.eventToEdit.next_event.address}, ${props.eventToEdit.next_event.city}` : `${props.eventToEdit.address}, ${props.eventToEdit.city}`) : '';
  const recurrences = giveHTMLID(props.eventToEdit.recurrences || []).map(ele => ele.type_of === 'weekly' ? ({...ele, type_of: moment(ele.initial).format('e')}) : ele);
  const mode = props.eventToEdit.mode || 'walking';

  const { input, repeats, handleInputChange, handleAddress, addRepeat, setRepeat, removeRepeat } = useEndlessForm({
    entry_id,
    entry,
    start_date,
    end_date,
    start_hour,
    end_hour,
    recurrences,
    raw_address,
    mode,
  });

  return (
    <form className='add-menu' onSubmit={(e) => e.preventDefault()} >
      <label htmlFor="entry">Title</label>
      <input type="text" name="entry" id="entry" placeholder="Event Name" defaultValue={entry} onChange={handleInputChange} autocomplete='off' required></input>
      <div className='location'>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <select name={`mode`}
          className='mode'
          id={`mode`}
          defaultValue={mode}
          onChange={(e) => {
            handleInputChange(e)                
        }}>
          <option value="walking">Walk</option>
          <option value="bicycling">Bike</option>
          <option value="driving">Drive</option>
          <option value="transit">Transit</option>
        </select>
        <span>to</span>
        <LocationSearchInput onChange={handleAddress} destination={raw_address}/>
        <label htmlFor={`mode`}>Transport Mode</label>
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
        <p>Repeats</p>
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
              <option value="1">Mon</option>
              <option value="2">Tue</option>
              <option value="3">Wed</option>
              <option value="4">Thu</option>
              <option value="5">Fri</option>
              <option value="6">Sat</option>
              <option value="0">Sun</option>
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
          pass && props.onWait(true);
        }}>
        {entry_id ? 'Save' : 'Add'}
      </button>
    </form>
  );
};