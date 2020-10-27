import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import { Home } from './Home'
import { NavMenu } from './NavMenu'

import Schedule from './Schedule'

function App() {
    const suggestions = {
        upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
        later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
    }

    const events = {
        departureTime: '8:24pm',
        today: [
            {
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
                "weather": "sunny"
            },
            {
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
                "weather": "cloudy",
                "entry_id": 1,
                "type_of": "weekly",
                "initial": "2020-03-09T04:00:00.000Z",
                "interval": 1,
                "recurrences_id": 1
            }],
        repeating:
            [{
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
                "weather": "rainy",
                "entry_id": 1,
                "recurrences": [
                    {
                        "type_of": "weekly",
                        "is_from_start_date": true, //start date +7 days based
                        "initial": "2020-03-09T04:00:00.000Z",
                        "interval": 2,
                        "recurrences_id": 1
                    },
                    {
                        "type_of": "weekly",
                        "is_from_start_date": false, //weekday based
                        "initial": "2020-03-10T04:00:00.000Z",
                        "interval": 1,
                        "recurrences_id": 2
                    }
                    ,
                    {
                        "type_of": "weekly",
                        "is_from_start_date": false, //weekday based
                        "initial": "2020-03-11T04:00:00.000Z",
                        "interval": 1,
                        "recurrences_id": 3
                    },
                    {
                        "type_of": "weekly",
                        "is_from_start_date": false, //weekday based
                        "initial": "2020-03-12T04:00:00.000Z",
                        "interval": 1,
                        "recurrences_id": 4
                    }
                ]

            },
            {
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
                "weather": "windy",
                "entry_id": 1,
                "type_of": "weekly",
                "initial": "2020-03-09T04:00:00.000Z",
                "interval": 1,
                "recurrences_id": 1
            }],
        future:
            [{
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
                "weather": null
            }]
    }

    const weather = {
        mainWeather: 'Sunny',
        feelsLikeTemp: '23',
        minTemp: '18',
        maxTemp: '29',
    };

    const [state, setState] = useState({
        view: 'home',
        loggedIn: false,
        weather,
        suggestions,
        events,
        time: 1603740043000
    });

    return (
        <main>
            <Home
                weather={state.weather}
                events={state.events}
                suggestions={state.suggestions}
            />
            <Schedule />
            {/* <NavMenu/> */}
        </main>
    );
}

export default App;
