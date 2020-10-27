const axios = require('axios');
const key = 'a528ff4636797a1121546bea69964059';
const exclusions = 'minutely'


const getWeather = (location) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.x}&lon=${location.y}&exclude=${exclusions}&appid=${key}`)
    .then(response => response.data)
    .catch(err => err);
  }



module.exports = {
  getWeather
};