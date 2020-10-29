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

import { filterEvents } from '../helpers/selectors';

const suggestions = {
  upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
  later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
}

const weather = {
  mainWeather: [
    "Clouds"
  ],
  feelsLikeTemp: 7.17,
  actualTemp: 10.78,
  feels_likeMin: 7.35,
  feels_likeMax: 9.02
}

const events = {
  today: [
    {
      entry: "morning run",
      id: 6,
      is_outdoor: true,
      destination: {
        x: 49.259432,
        y: -123.100795
      },
      start_date: "2020-03-05T05:00:00.000Z",
      start_hour: "07:00:00",
      end_hour: "07:30:00",
      entry_id: 2,
      type_of: "daily",
      initial: "2020-03-05T05:00:00.000Z",
      interval: 1,
      recurrence_id: 2,
      start_time: "2020-10-29T07:00:00",
      end_time: "2020-10-29T07:30:00",
      leave_by: "2020-10-29T06:36:10-04:00",
      weather: "Clouds"
    },
    {
      entry: "commute",
      id: 4,
      is_outdoor: true,
      destination: {
        x: 49.2301,
        y: -123.10867
      },
      start_date: "2020-03-05T05:00:00.000Z",
      start_hour: "08:00:00",
      end_hour: "16:00:00",
      entry_id: 1,
      type_of: "weekly",
      initial: "2020-03-12T04:00:00.000Z",
      interval: 1,
      recurrence_id: 1,
      start_time: "2020-10-29T08:00:00",
      end_time: "2020-10-29T16:00:00",
      leave_by: "2020-10-29T07:28:26-04:00",
      weather: "Clouds"
    },
    {
      entry: "commute",
      id: 4,
      is_outdoor: true,
      destination: {
        x: 49.2301,
        y: -123.10867
      },
      start_date: "2020-03-05T05:00:00.000Z",
      start_hour: "08:00:00",
      end_hour: "16:00:00",
      entry_id: 1,
      type_of: "weekly",
      initial: "2020-03-12T04:00:00.000Z",
      interval: 1,
      recurrence_id: 1,
      start_time: "2020-10-29T08:00:00",
      end_time: "2020-10-29T16:00:00",
      leave_by: "2020-10-29T07:28:26-04:00",
      weather: "Clear"
    }
  ],
  repeating: [
    {
      entry: "commute",
      entry_id: 1,
      start_date: "2020-03-05T05:00:00.000Z",
      start_hour: "08:00:00",
      end_hour: "16:00:00",
      next_event: {
        start_time: "2020-10-30T08:00:00",
        end_time: "2020-10-30T16:00:00",
        destination: {
          x: 49.2301,
          y: -123.10867
        },
        weather: "Clouds"
      },
      recurrences: [
        {
          id: 1,
          type_of: "weekly",
          initial: "2020-03-09T04:00:00.000Z",
          interval: 1
        },
        {
          id: 2,
          type_of: "weekly",
          initial: "2020-03-10T04:00:00.000Z",
          interval: 1
        },
        {
          id: 3,
          type_of: "weekly",
          initial: "2020-03-11T04:00:00.000Z",
          interval: 1
        },
        {
          id: 4,
          type_of: "weekly",
          initial: "2020-03-12T04:00:00.000Z",
          interval: 1
        },
        {
          id: 5,
          type_of: "weekly",
          initial: "2020-03-13T04:00:00.000Z",
          interval: 1
        }
      ]
    },
    {
      entry: "morning run",
      entry_id: 2,
      start_date: "2020-03-05T05:00:00.000Z",
      start_hour: "07:00:00",
      end_hour: "07:30:00",
      next_event: {
        start_time: "2020-10-30T07:00:00",
        end_time: "2020-10-30T07:30:00",
        destination: {
          x: 49.259432,
          y: -123.100795
        },
        weather: "Rain"
      },
      recurrences: [
        {
          id: 6,
          type_of: "daily",
          initial: "2020-03-05T05:00:00.000Z",
          interval: 1
        }
      ]
    }
  ],
  future: [
    {
      entry: "Boring convention",
      id: 6,
      destination: {
        x: 49.38654,
        y: -123.13254
      },
      is_outdoor: false,
      start_time: "2020-11-12T14:00:00.000Z",
      end_time: "2020-11-12T23:00:00.000Z",
      entry_id: 11,
      weather: null
    }
  ]
}

const homeAddress = {
  x: 49.24713,
  y: -123.10867
}

const recommendations = {
  now: [
    {
      name: "Normal clothing",
      description: "Not to hot, not too warm."
    }
  ],
  later: []
}

function App() {
  const [state, setState] = useState({
    loading: false,
    view: 'home',
    loggedIn: true,
    weather,
    recommendations: suggestions,
    events,
    time: 1603740043000,
    homeAddress,
    eventToEdit: {}
  });

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/users/2/weather'),
  //     axios.get('/api/users/2/recommendations'),
  //     axios.get('/api/users/2/events'),
  //     axios.get('/api/users/2'),
  //   ])
  //     .then(all => setState(prev => (
  //       {
  //         ...prev,
  //         loading: false,
  //         weather: all[0].data,
  //         recommendations: all[1].data,
  //         events: all[2].data,
  //         homeAddress: all[3].data
  //       })))
  // }, [])

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

  const openEdit = (entry_id) => {
    console.log("entry_id " + entry_id);
    console.log(state.events);

    const eventToEditArr = state.events.repeating.filter(eventItem => eventItem.entry_id === entry_id);
    console.log(eventToEditArr[0].entry_id);
    setState(prev => ({ ...prev, eventToEdit: eventToEditArr[0] }))
  };

  const clearToEdit = () => {
    setState(prev => ({ ...prev, eventToEdit: {} }))
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
          events={state.events}
          eventToEdit={state.eventToEdit}
          clearToEdit={clearToEdit}
        />

        {state.loading ?
          <div className='loader'>
            <h1 className='loader__text'>Loading ...</h1>
            <div className='loader__animation'></div>
          </div> :
          <div className='page-content'>
            <Switch>
              <Route exact path='/'>
                <Home
                  loggedIn={state.loggedIn}
                  weather={state.weather}
                  events={state.events}
                  recommendations={state.recommendations}
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
                  onEdit={openEdit}
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
            </Switch>
          </div>
        }
      </Router>
    </main>
  );
}

export default App;