import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import { Home } from './Home';
import { Login } from './Login';
import { Nav } from './Nav';
import { Schedule } from './Schedule';
import { About } from './About';
import { Settings } from './Settings';
import { Register } from './Register'

const suggestions = {
  upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
  later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
}

const events = {
  departureTime: '8:24pm',
  "today": [
    {
      "entry": "commute",
      "id": 1,
      "is_outdoor": true,
      "destination": {
        "x": 49.2301,
        "y": -123.10867
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "is_from_start_date": false,
      "entry_id": 1,
      "type_of": "weekly",
      "initial": "2020-03-09T04:00:00.000Z",
      "interval": 1,
      "recurrence_id": 1,
      "weather": null,
      "leave_by": "2020-10-27T18:35:46.229Z"
    },
    {
      "entry": "morning run",
      "id": 6,
      "is_outdoor": true,
      "destination": {
        "x": 49.259432,
        "y": -123.100795
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "07:00:00",
      "end_time": "07:30:00",
      "is_from_start_date": false,
      "entry_id": 2,
      "type_of": "daily",
      "initial": "2020-03-05T05:00:00.000Z",
      "interval": 1,
      "recurrence_id": 2,
      "weather": null
    }
  ],
  "repeating": [
    {
      "entry": "commute",
      "id": 1,
      "destination": {
        "x": 49.2301,
        "y": -123.10867
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "08:00:00",
      "end_time": "04:00:00",
      "is_from_start_date": false,
      "next_event": "2020-03-16T04:00:00.000Z",
      "next_weather": null,
      "recurrences": [
        {
          "type_of": "weekly",
          "initial": "2020-03-09T04:00:00.000Z",
          "interval": 2
        },
        {
          "type_of": "weekly",
          "initial": "2020-03-10T04:00:00.000Z",
          "interval": 1
        },
        {
          "type_of": "weekly",
          "initial": "2020-03-11T04:00:00.000Z",
          "interval": 1
        },
        {
          "type_of": "weekly",
          "initial": "2020-03-12T04:00:00.000Z",
          "interval": 1
        },
        {
          "type_of": "weekly",
          "initial": "2020-03-13T04:00:00.000Z",
          "interval": 1
        }
      ]
    },
    {
      "entry": "morning run",
      "id": 2,
      "destination": {
        "x": 49.259432,
        "y": -123.100795
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_time": "07:00:00",
      "end_time": "07:30:00",
      "is_from_start_date": false,
      "next_event": "2020-03-06T05:00:00.000Z",
      "next_weather": null,
      "recurrences": [
        {
          "type_of": "daily",
          "initial": "2020-03-05T05:00:00.000Z",
          "interval": 1
        }
      ]
    }
  ],
  "future": []
}

const weather = {
  mainWeather: 'Sunny',
  feelsLikeTemp: '23',
  minTemp: '18',
  maxTemp: '29',
};


function App() {
  const [state, setState] = useState({
    view: 'home',
    loggedIn: false,
    weather,
    suggestions,
    events,
    time: 1603740043000
  });

  const login = () => setState(prev => ({ ...prev, loggedIn: true }));
  const logout = () => setState(prev => ({ ...prev, loggedIn: false }));

  return (
    <main>
      <Router>
        <Nav
          view={state.view}
          onSelect={(name) => console.log(name)}
          onSubmit={(name) => console.log(name)}
          loggedIn={state.loggedIn}
          time={state.time}
        />

        <Switch>
          <Route exact path='/'>
            {state.loggedIn ?
              <Home
                loggedIn={state.loggedIn}
                weather={state.weather}
                events={state.events}
                suggestions={state.suggestions}
              /> :
              <Login login={login} />}
          </Route>

          <Route path='/schedule'>
            <Schedule
              loggedIn={state.loggedIn}
              events={state.events}
            />
          </Route>

          <Route path='/register'>
            <Register loggedIn={state.loggedIn} login={login}></Register>
          </Route>

          <Route path='/about'>
            <About />
          </Route>

          <Route path='/settings'>
            <Settings loggedIn={state.loggedIn}></Settings>
          </Route>

          <Route path='*'><h1>404 - Not Found</h1></Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;