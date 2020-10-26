const express = require('express');
const router = express.Router();




module.exports = ({ getUserEvents }, { createEventList }, { getTrip }) => {

  router.get('/:id/events', function (req, res) {
    getUserEvents(req.params.id)
      .then(rawEvents => {
        
        createEventList(rawEvents)
        res.json(createEventList(rawEvents))
        })
      .catch(err => res.json({ msg: err.message }))
  })

  router.get('/:id/today/recommandations', function (req, res) {
    getTrip()
      .then(res => cp)
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
