import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';
import './App.scss'

import { Home } from './Home';
import { Login } from './Login';
import { Nav } from './Nav';
import { Schedule } from './Schedule';
import { About } from './About';
import { Settings } from './Settings';
import { Register } from './Register';

const suggestions = {
  upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
  later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
}

const events = {
  departureTime: '8:24pm',
  "today": [
    {
      "entry": "commute",
      "id": 2,
      "is_outdoor": true,
      "destination": {
        "x": 49.2301,
        "y": -123.10867
      },
      "start_date": "2020-03-05T05:00:00.000Z",
      "end_date": null,
      "start_hour": "08:00:00",
      "end_hour": "04:00:00",
      "is_from_start_date": false,
      "entry_id": 1,
      "type_of": "weekly",
      "initial": "2020-03-10T04:00:00.000Z",
      "interval": 1,
      "recurrence_id": 1,
      "start_time": "2020-10-27T08:00:00",
      "end_time": "2020-10-27T012:00:00",
      "leave_by": "2020-10-27T07:28:26-04:00",
      "weather": null
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
      "start_hour": "07:00:00",
      "end_hour": "07:30:00",
      "is_from_start_date": false,
      "entry_id": 2,
      "type_of": "daily",
      "initial": "2020-03-05T05:00:00.000Z",
      "start_time": "2020-10-27T12:00:00",
      "end_time": "2020-10-27T16:00:00",
      "interval": 1,
      "recurrence_id": 2,
      "weather": null
    }
  ],
  "repeating": [
    {
      "entry": "skatepark",
      "entry_id": 3,
      "start_date": "2020-08-23T04:00:00.000Z",
      "end_date": null,
      "is_from_start_date": false,
      "next_event": {
        "start_time": "2020-11-01T04:00:00.000Z",
        "end_time": "2020-11-01T08:00:00.000Z",
        "weather": null,
        "destination": {
          "x": 43.70564,
          "y": -79.42154
        }
      },
      "recurrences": [
        {
          "id": 7,
          "type_of": "weekly",
          "initial": "2020-08-23T04:00:00.000Z",
          "interval": 2
        }
      ]
    }
  ],
  "future": [
    {
      "entry": "Skate competition",
      "id": 4,
      "destination": {
        "x": 43.66858,
        "y": -79.35459
      },
      "is_outdoor": true,
      "start_time": "2020-11-17T18:45:00.000Z",
      "end_time": "2020-11-17T23:30:00.000Z",
      "entry_id": 9,
      "weather": null
    }
  ]
}


function App() {
  const [state, setState] = useState({
    view: 'home',
    loggedIn: true,
    weather: {},
    suggestions,
    events,
    time: 1603740043000
  });

  useEffect(() => {
    axios.get('/api/users/2/weather')
      .then(res => setState(prev => ({...prev, weather: res.data})))
  }, [])

  const login = () => setState(prev => ({ ...prev, loggedIn: true }));
  const logout = () => setState(prev => ({ ...prev, loggedIn: false }));
  console.log(state.weather.mainWeather)
  return (
    <main>
      <Router>
        <Nav
          view={state.view}
          onSelect={(name) => console.log(name)}
          onSubmit={(name) => console.log(name)}
          loggedIn={state.loggedIn}
          time={state.time}
          logout={logout}
        />

        <Switch>
          <Route exact path='/'>
            <Home
              loggedIn={state.loggedIn}
              weather={state.weather}
              events={state.events}
              suggestions={state.suggestions}
            />
          </Route>

          <Route path='/login'>
            <Login loggedIn={state.loggedIn} login={login} />
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