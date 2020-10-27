const express = require('express');
const router = express.Router();

module.exports = ({ getMainWeather }) => {

  router.get('/', function (req, res) {
    const test = {
      x: 43.70564,
      y: -79.42154
    }
      getMainWeather(test)
        .then(data => res.json(data))
        .catch(err => res.json({ msg: err.message }))
  })
  return router
};

