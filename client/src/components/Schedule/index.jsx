import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import './styles.scss';
import { EventList } from './EventList';

const TODAY = 'today';
const REPEATING = 'repeating';
const FUTURE = 'future';

// Collapse any other toggled event list item when one list item is clicked
const handleToggle = (id) => { };


export const Schedule = props => {
  const [collapse, setCollapse] = useState();
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    setRerender(prev => !prev)
  }, [props])

  const collapseOthers = (type, id) => {
    console.log('in collapseOthers');
    // if ()
    setRerender(true)
  };

  return (
    <Fragment>
      {props.loggedIn ?
        <div className='schedule'>
          <h1 className='schedule__title'>Schedule</h1>
          {
            props.events[TODAY]
            && props.events[TODAY].length > 0
            && <EventList
              allEvents={props.events}
              events={props.events[TODAY]}
              type={TODAY}
              deleteEvent={props.deleteEvent}
              onEdit={props.onEdit}
              onToggle={collapseOthers}>
              Today
            </EventList>
          }
          {props.events[REPEATING]
            && props.events[REPEATING].length > 0
            && <EventList
              events={props.events[REPEATING]}
              type={REPEATING}
              deleteEvent={props.deleteEvent}
              onEdit={props.onEdit}
              onToggle={collapseOthers}>
              Repeating
            </EventList>
          }
          {
            props.events[FUTURE]
            && props.events[FUTURE].length > 0
            && <EventList
              allEvents={props.events}
              events={props.events[FUTURE]}
              type={FUTURE}
              deleteEvent={props.deleteEvent}
              onEdit={props.onEdit}
              onToggle={collapseOthers}>
              Future
            </EventList>
          }
        </div> :
        <Redirect to='/login' />
      }
    </Fragment>
  );
};