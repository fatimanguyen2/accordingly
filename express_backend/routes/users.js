const express = require('express');
const router = express.Router();
const {getPostsByUsers} = require('../helpers/dataHelpers');
const db = require('../db');


module.exports = ({ getUsers, addUser, getUserDay}) => {

  /* GET users listing. */
  // router.get('/', function (req, res) {
  //   getUsers()
  //     .then(users => res.json(users))
  //     .catch(err => res.json({ msg: err.message }))
  // });

  router.get('/:id/day', function (req, res) {
    getUserDay(req.params.id)
      .then(rawDay => {
        const parsedDay
      
        })
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
