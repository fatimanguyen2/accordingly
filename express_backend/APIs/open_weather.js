const axios = require('axios');
const key = 'a528ff4636797a1121546bea69964059';
const exclusions = 'minutely'
const moment = require('moment')


const getWeather = (location) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.x}&lon=${location.y}&exclude=${exclusions}&appid=${key}&units=metric`)
    .then(response => response.data)
    .catch(err => err);
  }

const getMainWeather = (location) => {
  return getWeather(location)
  .then(data => {
    console.log(data.hourly)
      return {
        mainWeather: data.current.weather.map(condtion => condtion.main),
        feelsLikeTemp: data.current.feels_like,
        actualTemp: data.current.temp,
        feels_likeMin : Math.min(...data.hourly.filter((hour, index) => index < 8).map(hour => hour.feels_like)),
        feels_likeMax : Math.max(...data.hourly.filter((hour, index) => index < 8).map(hour => hour.feels_like))
      }
    })
}

const getForecast = (event) => {
  const in48h = moment().add(48, 'h')
  return (moment(event.start_time).isBefore(moment().add(48, 'h')))
};

const test =         {
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
  "start_time": "2020-10-31T08:00:00",
  "leave_by": "2020-10-27T07:28:26-04:00"
}

console.log(getForecast(test))

module.exports = {
  getMainWeather,
};
