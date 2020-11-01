const { json } = require('express');
const express = require('express');
const router = express.Router();




module.exports = (
  { getUserEvents, getUserLocationById, getUserAddressById, getRecommendations, 
    postEntry, getImmediateRecommendations, makeEntryInactive }, 
  { createEventList, getTripsToday, getRelativeSchedule, conditionsOfDay, formatEntryForFrontEnd, getNowConditions }, 
  { formatAddressForDb }, 
  { getMainWeather, getDetailedForcast }
  ) => {

  router.get('/:id', function (req, res) {
    getUserAddressById(req.params.id)
      .then(location => res.json(location))
      .catch(err => res.json({ msg: err.message }))
  })

  

  router.post('/:id/entries', function (req, res) {
    formatAddressForDb(req.body.raw_address)
      .then(address => {
        if (!address.city.includes('Unorganized')) {
          return ({...req.body, title: req.body.entry, ...address})
        } else {
          res.json("Sorry we need at least a city")
        }
      })
      .then(entry => postEntry(entry, req.params.id))
      .then(postedEntry => formatEntryForFrontEnd(postedEntry.rows))
      .then(formattedEntry => res.json(formattedEntry))
      .catch(err => res.json({ msg: err.message }))
  })

  router.put('/:user_id/entries/:id', function (req, res) {
    formatAddressForDb(req.body.raw_address)
      .then(address => {
        if (!address.city.includes('Unorganized')) {
          return ({...req.body, title: req.body.entry, ...address})
        } else {
          res.json("Sorry we need at least a city")
        }
      })
      .then(entry => postEntry(entry, req.params.user_id))
      .then(postedEntry => formatEntryForFrontEnd(postedEntry.rows))
      .then(formattedEntry => res.json(formattedEntry))
      .then(() => makeEntryInactive(req.params.user_id))
      .catch(err => err)
  })
    

  router.get('/:id/events', function (req, res) {
    getUserEvents(req.params.id)
      .then(rawEvents => createEventList(rawEvents, req.params.id))
      .then(data => res.json(data))
      .catch(err => res.json({ msg: err.message }))
  })


  router.get('/:id/weather', function (req, res) {
      getUserLocationById(req.params.id)
        .then(userLocation => getMainWeather(userLocation))
        .then(data => res.json(data))
        .catch(err => res.json({ msg: err.message }))
  })


  router.get('/:id/recommendations', function (req, res) {
    let origin
    getUserLocationById(req.params.id)
      .then(homeLoc => origin = homeLoc)
      .then(() => getUserEvents(req.params.id))
      .then(rawEvents => createEventList(rawEvents, req.params.id))
      .then(eventList => getTripsToday(origin, eventList.today))
      .then(trips => {
        if (!trips) {
          return Promise.reject()
        } else {
          return getRelativeSchedule(trips)
        }
      })
      // Happy path event present
      .then(relSchedule => getDetailedForcast(relSchedule))
      .then(detForecast => conditionsOfDay(detForecast))
      .then(condOfDay => getRecommendations(condOfDay))
      .then(data => res.json(data))
      // Sad path no event (Aye, Aye, Aye!)
      .catch(() => {
        return getNowConditions(origin)
        .then(conditions => getImmediateRecommendations(conditions))
        .then(data => res.json({now : data.rows}))
        .catch(err => res.json({ msg: err.message }))
      })
  })


  return router;
}
