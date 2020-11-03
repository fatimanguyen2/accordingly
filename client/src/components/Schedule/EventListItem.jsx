import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { getWeatherIcon, getWeatherColor, changeWeatherClassname } from '../../helpers/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import RepeatList from './RepeatList';
import { Button } from '../Button'

const NORMAL = 'normal';
const DELETE = 'delete';

export const EventListItem = props => {
  const toggleBoolean = props.type === props.collapse.type && props.id === props.collapse.id ? true : false;
  const [toggle, setToggle] = useState(false);
  const [view, setView] = useState(NORMAL); //switch betwen normal view and delete item view for btns
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    setToggle(toggleBoolean)
    console.log('hi')
  }, [props.collapse])

  // setToggle and collapse other events
  const handleToggle = () => {
    setToggle(prev => !prev);
    if (!toggle) {
      props.onToggle(props.type, props.id)
    }
  };

  // Deleting an event when trash/confirm delete btn clicked
  const cancel = () => {
    if (view === NORMAL) {
      setView(DELETE);
    } else {
      props.deleteEvent(props.type, props.id);
      setRerender(prev => !prev);
    }
  };

  // Undo first delete click when back btn clicked
  const back = () => setView(NORMAL);

  // CLASS NAMES:
  //Build classname for each weather
  const weatherName = changeWeatherClassname(props.weather);
  // Ensure that background event list item color is weather color unless weather = null or in group 700 of open weather API
  let key = '';
  if (weatherName !== props.weather || weatherName === 'Thunderstorm' || weatherName === 'Drizzle') {
    key = `event-list-item--${weatherName}`;
  } else {
    key = 'event-list-item';
  }
  const itemClass = classNames('event-list-item', { [key + '--untoggled']: !toggle }, key);
  const itemMainClass = classNames({ 'event-list-item__main': !toggle, 'event-list-item__main--toggled': toggle });

  return (
    <li className={itemClass}>

      <div className={itemMainClass} onClick={handleToggle}>
        <div className='event-list-item__time' >
          <FontAwesomeIcon className='event-list-item__weather-icon' icon={getWeatherIcon(props.weather)} color={getWeatherColor(props.weather)} />
          <p>{props.type === 'today' ? moment(props.start).format('h:mm a') : moment(props.start).fromNow()} </p>
        </div>
        <div><p>{props.title}</p></div>
      </div>

      {toggle &&
        <div className='event-list-item__details'>
          <div onClick={() => setToggle(prev => !prev)}>
            <div className='event-list-item__address'>
              <FontAwesomeIcon className='event-list-item__address-icon' icon={faMapMarkerAlt} />
              <p>{props.destination}</p>
            </div>
            <div className='event-list-item__details__time'>
              <FontAwesomeIcon className='event-list-item__time-icon' icon={faClock} />
              <div>
                <p> {moment(props.start).format('dddd, MMM Do   h:mm a')}</p>
                <p> {moment(props.end).format('dddd, MMM Do   h:mm a')}</p>
              </div>
            </div>
            {
              props.recurrences ?
                <RepeatList recurrences={props.recurrences} /> : <div className='repeat-title'><p> Does not repeat </p></div>
            }
          </div>
          {
            view === NORMAL ?
              <div className='event-list-item__btns'>
                <Button classname='edit' onClick={() => props.onEdit(props.entry_id)}>Edit</Button>
                <Button classname='trash' onClick={cancel}><FontAwesomeIcon icon={faTrash} /></Button>
              </div> :
              <div className='event-list-item__btns'>
                <Button classname='back' onClick={back}>Back</Button>
                <Button classname='confirm-delete' onClick={cancel}>Confirm Delete</Button>
              </div>
          }
        </div>
      }
    </li>
  );
};