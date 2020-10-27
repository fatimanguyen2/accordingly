const axios = require('axios');
const { response } = require('express');
const key = process.env.GOOGLE_API_KEY;

const getTripTime = (from, to) => {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from.x},${from.y}&destinations=${to.x},${to.y}&key=${key}`)
    .then(response => response.data)
    .catch(err => err)
}


module.exports = {
  getTripTime
};
