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
import { fakeEvents, fakeRecommendations } from '../mock/mock';

import { filterEvents, setPrimaryColors, getItem, getSuggestionCategory } from '../helpers/selectors';

let initialRecommendations = {};

function App() {
  const time = Date.now();
  const [state, setState] = useState({
    loading: false,
    view: 'home',
    loggedIn: false,
    isMockData: false,
    weather: {},
    recommendations: {},
    events: {},
    time,
    homeAddress: {},
    eventToEdit: {}
  });

  // Use real data from API calls
  const getAllData = () => {
    Promise.all([
      axios.get('/api/users/2/weather'),
      axios.get('/api/users/2/recommendations'),
      axios.get('/api/users/2/events'),
      axios.get('/api/users/2'),
    ])
      .then(all => {
        const time = Date.now();
        initialRecommendations = all[1].data;

        // // Setting app primary color
        let colours = setPrimaryColors(all[0].data);
        document.documentElement.style.setProperty('--primary-color', colours.solid);
        document.documentElement.style.setProperty('--primary-color-gradient', colours.gradient);

        return setState(prev => (
          {
            ...prev,
            loading: false,
            weather: all[0].data,
            recommendations: { ...all[1].data, done: [] },
            events: all[2].data,
            homeAddress: all[3].data,
            time
          }))
      })
  };

  // DEMO PURPOSES
  const getMockData = () => {
    Promise.all([
      axios.get('/api/users/2/weather'),
      axios.get('/api/users/2')
    ])
      .then(all => {
        const time = Date.now();
        initialRecommendations = fakeRecommendations;

        // // Setting app primary color
        let colours = setPrimaryColors(all[0].data);
        document.documentElement.style.setProperty('--primary-color', colours.solid);
        document.documentElement.style.setProperty('--primary-color-gradient', colours.gradient);

        setState(prev => (
          {
            ...prev,
            loading: false,
            weather: all[0].data,
            recommendations: fakeRecommendations,
            events: fakeEvents,
            homeAddress: all[1].data,
            time
          }
        ))
      })
  };
  
  useEffect(() => {
    if (state.loggedIn) {
      setState(prev => ({ ...prev, loading: true }))
      if (state.isMockData) {
        getMockData()
      } else {
        getAllData();
      }
    }
  }, [state.loggedIn]);


  const login = () => setState(prev => ({ ...prev, loggedIn: true }));
  const logout = () => {
    // Change back primary colors
    document.documentElement.style.setProperty('--primary-color', '#f5f1e3');
    document.documentElement.style.setProperty('--primary-color-gradient', '#f5f1e3');
    setState(prev => ({ ...prev, loggedIn: false, isMockData: false }))
  };

  // Change state when checking items on recommendation list in home component
  const handleCheck = (id, type) => {
    const item = getItem(id, state.recommendations[type]); //get item object
    const category = getSuggestionCategory(id, initialRecommendations); //get initial item category of axios request to ensure done itesm go back to right category

    // if item gets checked and is in upcoming/later list, remove from that list and add to done list
    if (type !== 'done') {
      const updatedRecommendationsObj = {
        ...state.recommendations,
        [type]: state.recommendations[type].filter(item => item.id !== id),
        done: [...state.recommendations.done, item]
      };
      setState(prev => ({ ...prev, recommendations: updatedRecommendationsObj }))
    } else { //if item is unchecked from done list, move it back to original list(upcoming/later) or remove if no longer relevant
      const updatedRecommendationsObj = {
        ...state.recommendations,
        done: state.recommendations.done.filter(item => item.id !== id),
        [category]: [...state.recommendations[category], item]
      };
      setState(prev => ({ ...prev, recommendations: updatedRecommendationsObj }))
    }
  };

  const updateAddress = (addressObj) => {
    axios.put('/api/users/2', { raw_address: addressObj })
      .then(() => getAllData())
      .catch(() => console.log('failed to update address'));
  };

  const deleteEvent = (scheduleType, id) => {
    const filteredArr = filterEvents(scheduleType, id, state.events);
    const newEventsObj = { ...state.events, [scheduleType]: filteredArr };

    axios.delete(`/api/entries/${id}`)
      .then(() => getAllData())
      .catch(() => console.log('failed delete'));
  };

  const addEvent = (eventObj) => {
    console.log('add event triggered: ');
    console.log(eventObj);
    axios.post('/api/users/2/entries', eventObj)
      .then(() => getAllData())
      .catch(() => console.log('failed to add event'));
  };

  const editEvent = (eventObj) => {
    console.log('update event triggered: ');
    console.log(eventObj);
    axios.put(`/api/users/2/entries/${eventObj.entry_id}`, eventObj)
      .then(() => getAllData())
      .catch(() => console.log('failed to update event'));
  };


  const openEdit = (entry_id) => {
    // console.log("entry_id " + entry_id);
    // console.log(state.events);
    const allEvents = [...state.events.repeating, ...state.events.future, ...state.events.today.filter(ele => ele.recurrence_id === undefined)]
    console.log(allEvents);
    const eventToEditArr = allEvents.filter(eventItem => eventItem.entry_id === entry_id);
    console.log(eventToEditArr[0]);
    setState(prev => ({ ...prev, eventToEdit: eventToEditArr[0] }))
  };

  const clearToEdit = () => {
    setState(prev => ({ ...prev, eventToEdit: {} }))
  };

  const useMock = () => setState(prev => ({ ...prev, loggedIn:true, isMockData: true }));

  return (
    <main className='page-content'>
      {state.loading
        ? <div className='loader'>
          {/* <h1 className='loader__text'>Loading ...</h1> */}
          <div className='loader__animation'></div>
        </div>
        : <div>
          <Router>
            <Nav
              view={state.view}
              onSelect={(name) => getAllData()}
              onSubmit={addEvent}
              onEdit={editEvent}
              loggedIn={state.loggedIn}
              isMockData={state.isMockData}
              time={state.time}
              logout={logout}
              events={state.events}
              eventToEdit={state.eventToEdit}
              clearToEdit={clearToEdit}
            />

            <Switch>
              <Route exact path='/'>
                <Home
                  loggedIn={state.loggedIn}
                  weather={state.weather}
                  recommendations={state.recommendations}
                  handleCheck={handleCheck}
                  events={state.events.today}
                />
              </Route>

              <Route path='/login'>
                <Login
                  loggedIn={state.loggedIn}
                  login={login}
                  demo={useMock} />
              </Route>

              <Route path='/schedule'>
                <Schedule
                  loggedIn={state.loggedIn}
                  // isMockData={state.isMockData}
                  events={state.events}
                  deleteEvent={deleteEvent}
                  onEdit={openEdit}
                />
              </Route>

              <Route path='/register'>
                <Register
                  loggedIn={state.loggedIn}
                  login={login}></Register>
              </Route>

              <Route path='/about'>
                <About />
              </Route>

              <Route path='/settings'>
                <Settings
                  loggedIn={state.loggedIn}
                  address={state.homeAddress}
                  updateAddress={updateAddress}>
                </Settings>
              </Route>

              <Route path='*'><h1>404 - Not Found</h1></Route>
            </Switch>
          </Router>
        </div>
      }
    </main>
  );
}

export default App;