const express = require('express');
const router = express.Router();
const { getTripTime } = require('../APIs/google_map')




module.exports = (
  { getUserEvents, getUserLocationById }, 
  { createEventList, checkReocsToday }, 
  { locationToAddress }, 
  { getWeather }
  ) => {

  router.get('/:id/events', function (req, res) {
    getUserEvents(req.params.id)
      .then(rawEvents => createEventList(rawEvents, req.params.id))
      .then(data => res.json(data))
      .catch(err => res.json({ msg: err.message }))
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
    // getUserEvents(req.params.id)
    //   .then(data => res.json(data[0].concat(checkReocsToday(data[1]))))

    // getUserLocationById(req.params.id)
    //   .then(data => res.json(data))

    getTripTime(test, test2)
      .then(data => res.json(data))

    // getWeather(test)
      // .then(data => res.json(data))
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
