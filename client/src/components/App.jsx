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
import {WeatherRing} from './Home/WeatherRing';

import { filterEvents } from '../helpers/selectors';

const suggestions = {
  upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
  later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
}

function App() {
  const [state, setState] = useState({
    loading: true,
    view: 'home',
    loggedIn: true,
    weather: {},
    suggestions,
    events: {},
    time: 1603740043000,
    homeAddress: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/users/2/weather'),
      axios.get('/api/users/2/events'),
      axios.get('/api/users/2')
    ])
      .then(all => setState(prev => ({ ...prev, loading: false, weather: all[0].data, events: all[1].data, homeAddress: all[2].data })))
  }, [])

  const login = () => setState(prev => ({ ...prev, loggedIn: true }));
  const logout = () => setState(prev => ({ ...prev, loggedIn: false }));

  const updateAddress = (addressObj) => {
    axios.put('/api/users/2', addressObj)
      .then(() => setState(prev => ({ ...prev, homeAddress: addressObj })))
      .catch(() => console.log('failed to update address'));
  };

  const deleteEvent = (scheduleType, id) => {
    const filteredArr = filterEvents(scheduleType, id, state.events);
    const newEventsObj = { ...state.events, [scheduleType]: filteredArr };

    axios.delete(`/api/entries/${id}`)
      .catch(() => {
        setState(prev => ({ ...prev, events: newEventsObj }))
      })
    // .catch(() => console.log('failed delete')); // TO FIX
  };


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

        {state.loading ? <WeatherRing mainWeather='Loading...' /> :
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
                deleteEvent={deleteEvent}
              />
            </Route>

            <Route path='/register'>
              <Register loggedIn={state.loggedIn} login={login}></Register>
            </Route>

            <Route path='/about'>
              <About />
            </Route>

            <Route path='/settings'>
              <Settings loggedIn={state.loggedIn} address={state.homeAddress} updateAddress={updateAddress}></Settings>
            </Route>

            <Route path='*'><h1>404 - Not Found</h1></Route>
          </Switch>}
      </Router>
    </main>
  );
}

export default App;