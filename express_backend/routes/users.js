const express = require('express');
const router = express.Router();




module.exports = (
  { getUserEvents, getUserLocationById, getUserAddressById, getRecommendations, postEntry }, 
  { createEventList, getTripsToday, getRelativeSchedule, condtionsOfDay, formatEntryForFrontEnd }, 
  { formatAddressForDb }, 
  { getMainWeather, getDetailedForcast }
  ) => {

  router.get('/:id', function (req, res) {
    getUserAddressById(req.params.id)
      .then(location => res.json(location))
  })

  const test = {
    raw_address: "canada",
    start_date: "2020-10-30",
    start_hour: "17:11",
    end_date: "2020-10-30",
    end_hour: "21:12",
    entry: "adsgf",
    entry_id: null,
    recurrences: 
      [
        {
          interval: 1,
          type_of: "day",
        },
        {
          interval: 1,
          type_of: "3",
        }
      ],
  }
  

  router.post('/:id/entries', function (req, res) {
    formatAddressForDb(test.raw_address)
      .then(address => {
        console.log(address)
        if (!address.city.includes('Unorganized')) {
          return ({...test, title: test.entry, ...address})
        } else {
          res.json("Sorry we need at least a city")
        }
      })
      .then(entry => postEntry(entry, req.params.id))
      .then(postedEntry => formatEntryForFrontEnd(postedEntry.rows))
      .then(formattedEntry => res.json(formattedEntry))
  })

    


  router.put('/:user_id/entries/:id', function (req, res) {

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
      .then(trips => getRelativeSchedule(trips))
      .then(relSchedule => getDetailedForcast(relSchedule))
      .then(detForecast => condtionsOfDay(detForecast))
      .then(condOfDay => getRecommendations(condOfDay))
      .then(data => res.json(data))
  })




  // router.post('/', (req, res) => {

  //   const {
  //     first_name,
  //     last_name,
  //     email,
  //     password
  //   } = req.body;

  //   getUserByEmail(email)
  //     .then(user => {

  //       if (user) {
  //         res.json({
  //           msg: 'Sorry, a user account with this email already exists'
  //         });
  //       } else {
  //         return addUser(first_name, last_name, email, password)
  //       }

  //     })
  //     .then(newUser => res.json(newUser))
  //     .catch(err => res.json({
  //       error: err.message
  //     }));

  // })


  return router;
}
