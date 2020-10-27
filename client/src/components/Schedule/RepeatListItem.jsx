import React, { Fragment } from 'react';
import moment from 'moment';

export default function RepeatListItem(props) {
  return (
    <Fragment>
      {props.frequency === 'daily' && <li>Every day</li>}
      {props.frequency === 'weekly' && props.interval === 1 && <li>Every {moment(props.initial).format('dddd')}</li>}
      {props.frequency === 'weekly' && props.interval !== 1 && <li>Every {props.interval} {moment(props.initial).format('dddd')}s </li>}
      {props.frequency === 'monthly' && props.interval === 1 && <li>Every month </li>}
      {props.frequency === 'monthly' && props.interval !== 1 && <li>Every {props.interval} months </li>}
      {props.frequency === 'yearly' && props.interval === 1 && <li>Every year </li>}
      {props.frequency === 'yearly' && props.interval !== 1 && <li>Every {props.interval} years </li>}
    </Fragment>
  );
};