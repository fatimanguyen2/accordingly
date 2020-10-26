import React, {useState, Fragment} from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faClock} from '@fortawesome/free-solid-svg-icons';


export default function EventListItem(props) {
  const [toggle, setToggle] = useState(false);
  const now = moment().format('dddd, MMM Do');

  return (
    <li onClick={() => {
      console.log(now)
      setToggle(!toggle)}}>
      <div>
        <img src={props.weatherIcon} alt='Weather icon' />
        <p>{props.startTime} {props.title}</p>
      </div>
      {toggle && 
      <Fragment>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt}/>
          <p>{props.destination}</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock}/>
          <div>
            <p> {now} {props.startTime} </p>
            <p> {now} {props.endTime} </p>
          </div>
        </div>
      </Fragment>
      }
    </li>
  );
};