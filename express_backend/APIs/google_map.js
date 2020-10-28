const axios = require('axios');
const { response } = require('express');
const key = process.env.GOOGLE_API_KEY;
const moment = require('moment');
const { getTripsToday } = require('../helpers/dataHelpers');

const getTripTime = (from, to) => {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from.x},${from.y}&destinations=${to.x},${to.y}&key=${key}&mode=walking`)
    .then(response => response.data.rows[0].elements[0].duration.value)
    .catch(err => err)
}

const getMultipleTripTime = (path) => {
  const timeOfTrips = path.map(trip => getTripTime(trip[0], trip[1]))
  return Promise.all(timeOfTrips)
    .then(tripTimes => {
      return tripTimes.map((time, index) => ({ start_point: path[index][0], time: time}))
    })
}

const getDifferentTripTime = (from, destinations) => {
  let formattedDests = ''
  for (const destination of destinations) {
    formattedDests += `|${destination.x},${destination.y}`
  }
  formattedDests = formattedDests.substring(1)
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from.x},${from.y}&destinations=${formattedDests}&key=${key}&mode=walking`)
    .then(response => response.data.rows)
    .catch(err => err)
}


const getLeaveBy = (origin, event) => {
   return getTripTime(origin, event.destination)
    .then(time => {
      return moment(event.start_time).subtract(time, "s")
  })
}

module.exports = {
  getTripTime,
  getMultipleTripTime,
  getLeaveBy
};
