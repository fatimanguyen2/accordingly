import React, {useState, Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faClock} from '@fortawesome/free-solid-svg-icons';
{/* <FontAwesomeIcon icon={faCaretDown}/> */}


export default function EventListItem(props) {
  const [toggle, setToggle] = useState(false)
  return (
    <li onClick={() => setToggle(!toggle)}>
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
            <p> {props.startTime} </p>
            <p> {props.endTime} </p>
          </div>
        </div>
      </Fragment>
      }
    </li>
  );
};