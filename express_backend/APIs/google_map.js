const axios = require('axios');
const { response } = require('express');
const key = process.env.GOOGLE_API_KEY;
const moment = require('moment')

const getTripTime = (from, to) => {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from.x},${from.y}&destinations=${to.x},${to.y}&key=${key}&mode=walking`)
    .then(response => response.data.rows[0].elements[0].duration.value)
    .catch(err => err)
}

const getLeaveBy = (origin, event) => {
   return getTripTime(origin, event.destination)
   .then(time => moment(event.start_time).subtract(time, "s"))
}

module.exports = {
  getTripTime,
  getLeaveBy
};
