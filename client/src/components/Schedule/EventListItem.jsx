import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { getWeatherIcon, getWeatherColor, changeWeatherName } from '../../helpers/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import RepeatList from './RepeatList';
import { Button } from '../Button'

const NORMAL = 'normal';
const DELETE = 'delete';

export default function EventListItem(props) {
  const [toggle, setToggle] = useState(false);
  const [view, setView] = useState(NORMAL);

  const cancel = () => {
    if (view === NORMAL) {
      setView(DELETE);
    } else {
      props.deleteEvent(props.type, props.id)
    }
  };

  const back = () => setView(NORMAL);
  const edit = () => console.log('edit click');

  //Build classname for each weather
  const weatherName = changeWeatherName(props.weather);
  const key = `event-list-item--${weatherName}`;
  const itemClass = classNames('event-list-item', {'event-list-item--unchecked': toggle === false}, key);

  return (
    <li className={itemClass}>
      <div className='event-list-item__main' onClick={() => setToggle(prev => !prev)}>
        <div className='event-list-item__time' >
          <FontAwesomeIcon className='event-list-item__weather-icon' icon={getWeatherIcon(props.weather)} color={getWeatherColor(props.weather)} />
          <p>{props.type === 'today' ? moment(props.start).format('HH:mm') : moment(props.start).fromNow()} </p>
        </div>
        <div><p>{props.title}</p></div>
      </div>
      {toggle &&
        <div className='event-list-item__details'>
          <div onClick={() => setToggle(false)}>
            <div className='event-list-item__address'>
              <FontAwesomeIcon className='event-list-item__address-icon' icon={faMapMarkerAlt} />
              <p>{props.destination}</p>
            </div>
            <div className='event-list-item__details__time'>
              <FontAwesomeIcon className='event-list-item__time-icon' icon={faClock} />
              <div>
                <p> {moment(props.start).format('dddd, MMM Do   HH:mm')}</p>
                <p> {moment(props.end).format('dddd, MMM Do   HH:mm')}</p>
              </div>
            </div>
          {
            props.recurrences ?
            <RepeatList recurrences={props.recurrences} /> : <div className='repeat-title'><p> Does not repeat </p></div>
          }
          </div>
          {
            view === NORMAL ?
              <div>
                <Button classname='event-list-item__edit-btn' onClick={() => props.onEdit(props.entry_id)}>Edit</Button>
                <Button classname='event-list-item__trash-btn' onClick={cancel}><FontAwesomeIcon icon={faTrash} /></Button>
              </div> :
              <div>
                <Button classname='event-list-item__back-btn' onClick={back}>Back</Button>
                <Button classname='event-list-item__confirm-delete-btn' onClick={cancel}>Confirm Delete</Button>
              </div>
          }
        </div>
      }
    </li>
  );
};