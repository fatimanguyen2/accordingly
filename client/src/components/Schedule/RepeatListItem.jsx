import React, { Fragment } from 'react';
import moment from 'moment';
// "recurrences": [
//   {"type_of": "weekly",
//   "initial": "2020-03-09T04:00:00.000Z",
//   "interval": 1,
//   "reocurrence_id": 1},
//   {"type_of": "weekly",
//   "initial": "2020-03-09T04:00:00.000Z",
//   "interval": ,
//   "reocurrence_id": 1}
// ]

export default function RepeatListItem(props) {
  return (
    <Fragment>
      {props.frequency === 'weekly' && props.interval === 1 && <li>Every {moment(props.initial).format('dddd')}</li>}
      {props.frequency === 'weekly' && props.interval !== 1 && <li>Every {props.interval} weeks </li>}
      {props.frequency === 'monthly' && props.interval === 1 && <li>Every month </li>}
      {props.frequency === 'monthly' && props.interval !== 1 && <li>Every {props.interval} months </li>}
      {props.frequency === 'yearly' && props.interval === 1 && <li>Every year </li>}
      {props.frequency === 'yearly' && props.interval !== 1 && <li>Every {props.interval} years </li>}
    </Fragment>
  );
};