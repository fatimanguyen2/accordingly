import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getWeatherIcon } from '../../helpers/selectors';

export default function EventListItem(props) {

  return (
  <li>{props.title} - {moment(props.start).format('h:mm a')} <FontAwesomeIcon icon={getWeatherIcon(props.weather)}/></li>
  );
};