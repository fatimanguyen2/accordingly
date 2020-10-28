const express = require('express');
const router = express.Router();




module.exports = (
  { getUserEvents, getUserLocationById }, 
  { createEventList, getTripsToday, getRelativeSchedule }, 
  { locationToAddress }, 
  { getMainWeather, getDetailedForcast }
  ) => {

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

  router.get('/:id', function (req, res) {
    getUserLocationById(req.params.id)
      .then(location => res.json(location))
  })

  const test = {
    x: 43.70564,
    y: -79.42154
  }

  const test2 = {
    x: 43.75064,
    y: -79.41254
  }


  router.get('/:id/recommendations', function (req, res) {
    let origin
    getUserLocationById(req.params.id)
    .then(homeLoc => origin = homeLoc)
    .then(() => getUserEvents(req.params.id))
    .then(rawEvents => createEventList(rawEvents, req.params.id))
    .then(eventList => getTripsToday(origin, eventList.today))
    .then(trips => getRelativeSchedule(trips))
    .then(relSchedule => getDetailedForcast(relSchedule))
    .then(data => res.json(data))

    // getUserLocationById(req.params.id)
    //   .then(data => res.json(data))

    // getTripTime(test, test2)
    //   .then(data => res.json(data))

    // getWeather(test)
    //   .then(data => res.json(data))
      // .catch(err => res.json({ msg: err.message }))
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
