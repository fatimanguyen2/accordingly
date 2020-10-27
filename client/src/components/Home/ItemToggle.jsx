import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

export default function ItemToggle(props) {
  return <button onClick={props.toggle}> <FontAwesomeIcon icon={faCaretDown}/> </button>;
};