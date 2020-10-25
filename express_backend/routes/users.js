const express = require('express');
const router = express.Router();
const {getPostsByUsers} = require('../helpers/dataHelpers');
const db = require('../db');
const { json } = require('express');


module.exports = ({ getUsers, addUser}) => {

  /* GET users listing. */
  // router.get('/', function (req, res) {
  //   getUsers()
  //     .then(users => res.json(users))
  //     .catch(err => res.json({ msg: err.message }))
  // });

  router.get('/:id/day', function (req, res) {
    const getUserDay = (user, day) => {
      const queryTrips = (`
      SELECT title AS entry, trips.* FROM entries
      JOIN trips on trips.entry_id = entries.id
      WHERE user_id = ${user} AND entries.is_active = TRUE AND (start_time > '2020-11-17' AND start_time < '2020-11-18')
      `) /// fixed date to be replace by dynamic today

      const queryReocurrence = (`
      SELECT title AS entry, reocurrences.* FROM entries
      JOIN reocurrences ON reocurrences.entry_id = entries.id
      WHERE user_id = ${user} AND entries.is_active = TRUE
      `)

      const results = []

      return db.query(queryTrips)
        .then(trips => results.push(trips.rows))
        .then(() => db.query(queryReocurrence))
        .then(reoc => results.push(reoc.rows))
        .then(() => res.json(results))
        .catch(err => res.json({ msg: err.message }))
    }

    getUserDay(req.params.id)
    
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
