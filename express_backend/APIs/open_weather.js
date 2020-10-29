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
        feels_likeMin : Math.min(...data.hourly.filter((hour, index) => index < 12).map(hour => hour.feels_like)),
        feels_likeMax : Math.max(...data.hourly.filter((hour, index) => index < 12).map(hour => hour.feels_like))
      }
    })
}

const getDetailedForcast = (schedule) => {
  const allForecasts = schedule.map(step => {
    const hour = step.hours_from_now
    if (hour > 0) {
      return getWeather(step.start_point)
        .then(data => data.hourly[hour])
    } else if (hour == 0) {
      return getWeather(step.start_point)
      .then(data => data.current)
    } else {
      return null
    }
  })
  return Promise.all(allForecasts)
}

///need refactorging call only one time
const getForecastCategory = (event) => {
  const start = event.start_time;
  const in48h = moment().add(48, 'h');
  if (moment(start).isBefore(in48h)) {
    const hour = moment(start).diff(test6AM, "hour")
    if (hour > 0) {
      return getWeather(event.destination)
        .then(data => data.hourly[hour].weather[0].main)
    } else {
      return null
    }
  } else {
    const day = moment(start).diff(moment(), "day")
    if (day > 7 || day < 1){
      return null
    }
    return getWeather(event.destination)
    .then(data => data.daily[day].weather[0].main)
  }
};


module.exports = {
  getMainWeather,
  getForecastCategory,
  getDetailedForcast
};
