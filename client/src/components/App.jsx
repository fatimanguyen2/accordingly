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

function App() {
  const [state, setState] = useState({
    view: 'home',
    loggedIn: true,
    weather: {},
    suggestions,
    events: {},
    time: 1603740043000
  });

  useEffect(() => {
      Promise.all([
          axios.get('/api/users/2/weather'),
          axios.get('api/users/2/events')
      ])
      .then(all => setState(prev => ({...prev, weather: all[0].data, events: all[1].data})))
  }, [])

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