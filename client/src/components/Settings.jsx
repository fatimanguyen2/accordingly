import React, { Fragment, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export const Settings = props => {
  return (
    <Fragment>
      {props.loggedIn ?
        <div>
          <h1>Settings</h1>

        </div> :
        <div><h1>Please register/log in.</h1></div>
      }
    </Fragment>
  );
};