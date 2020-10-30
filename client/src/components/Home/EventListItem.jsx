import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getWeatherIcon, getWeatherColor } from '../../helpers/selectors';

export default function EventListItem(props) {

  return (
    <li className='event-list-item'>
      {props.title} - {moment(props.start).format('h:mm a')} 
      <FontAwesomeIcon className='event-list-item__icon' icon={getWeatherIcon(props.weather)} color={getWeatherColor(props.weather)} />
    </li>
  );
};