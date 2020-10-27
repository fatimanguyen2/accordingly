const axios = require('axios');
const key = 'a528ff4636797a1121546bea69964059';
const exclusions = 'minutely'


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


module.exports = {
  getMainWeather,
};
