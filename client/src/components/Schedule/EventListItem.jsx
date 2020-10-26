import React, { useState, Fragment } from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function EventListItem(props) {
  const [toggle, setToggle] = useState(false);
  const date = moment().format('dddd, MMM Do');

  return (
    <li onClick={() => setToggle(!toggle)}>
      <div>
        <img src={props.weatherIcon} alt='Weather icon' />
        <p>{props.startTime} {props.title}</p>
      </div>
      {toggle &&
        <Fragment>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>{props.destination}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} />
            <div>
              <p> {date} {props.startTime} </p>
              <p> {date} {props.endTime} </p>
            </div>
          </div>
          <div>
            <p> {props.reoccurenceId? 'Repeats' : 'Does not Repeat'} </p>
          </div>
          <div>
            <button>Edit</button>
            <button><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </Fragment>
      }
    </li>
  );
};