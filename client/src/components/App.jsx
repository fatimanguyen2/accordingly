import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import useApplicationData from '../hooks/useApplicationData';
// import { SET_USERS } from '../reducers/dataReducer';

import { Home } from './Home'
import { NavMenu } from './NavMenu'

import Schedule from './Schedule'
// Data needed for HOME component
// const suggestions = {
//     upcoming: [{ id: 1, name: 'hat', description: 'Keep that head sheltered from the cold' }, { id: 2, name: 'suncreen', description: 'It is sunny outside' }],
//     later: [{ id: 3, name: 'top', description: 'layer up' }, { id: 4, name: 'gloves', description: 'It is cold' }]
// }
// const events = [
//     { id: 1, title: 'work', startTime: '9:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
//     { id: 2, title: 'lunch', startTime: '10:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
//     { id: 3, title: 'meeting', startTime: '11:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' },
//     { id: 4, title: 'meeting', startTime: '13:00', weatherIcon: 'http://openweathermap.org/img/wn/02d@2x.png' }
// ];
// mainWeather='Sunny'
// feelsLikeTemp='23'
// minTemp='18'
// maxTemp='29'
// departureTime='8:24pm'

function App() {

    const events = {
        today: [
            {
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7'
            },
            {
                "entry": "commute",
                "start_time": "08:00:00",
                "end_time": "04:00:00",
                "date": 'timestamp',
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7',
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
                "destination": '8469 Boul. Saint-Michel, Montreal QC H1Z 3E7'
            }]
    }

    const [state, setState] = useState(false);

    return (
        <main>
            <Home />
            <Schedule />
            <NavMenu />
        </main>
    );
}

export default App;
