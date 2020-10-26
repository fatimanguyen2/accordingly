const express = require('express');
const router = express.Router();




module.exports = ({ getUserEvents }, { createEventList, checkReocsToday }, { getTrip, locationToAddress }, { getWeather }) => {

  router.get('/:id/events', function (req, res) {
    getUserEvents(req.params.id)
      .then(rawEvents => {
        res.json(createEventList(rawEvents))
        })
      .catch(err => res.json({ msg: err.message }))
  })

  const test = {
    x: 43.70564,
    y: -79.42154
}


  router.get('/:id/recommendations', function (req, res) {
    // getUserEvents(req.params.id)
    //   .then(data => res.json(data[0].concat(checkReocsToday(data[1]))))

    locationToAddress(test)
    .then(data => res.json(data))

    // getWeather(test)
      // .then(data => res.json(data))
      .catch(err => res.json({ msg: err.message }))
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
