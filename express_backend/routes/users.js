const express = require('express');
const router = express.Router();




module.exports = (
  { getUserEvents, getUserLocationById, getUserAddressById, getRecommendations }, 
  { createEventList, getTripsToday, getRelativeSchedule, condtionsOfDay }, 
  { formatAddressForDb }, 
  { getMainWeather, getDetailedForcast }
  ) => {

  router.get('/:id', function (req, res) {
    getUserAddressById(req.params.id)
      .then(location => res.json(location))
  })

  const test = {
    destination: "123 Melrose Street, Brooklyn, NY, USA",
    end_date: "2020-10-30",
    end_hour: "",
    end_time: "16:34",
    entry: "sdfg",
    entry_id: null,
    interval_count_2: "2",
    interval_type_2: "2",
    recurrences: [
      {
        html_id: 1,
        interval: 1,
        type_of: "day"
      },
      {
        html_id: 2,
        interval: 1,
        type_of: "2",
        length: 2
      }
    ],
    start_date: "2020-10-31",
    start_hour: "16:32",
  }
  

  router.post('/:id/entries', function (req, res) {
    // formatAddressForDb(test.destination)
    //   .then(address => ({title: test.entry, ...address}))
    //   .then(data => res.json(data))

    const createTrip = (test) => {
      
    }

    const createRec = (test) => {

    }
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
