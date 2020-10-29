const express = require('express');
const router = express.Router();




module.exports = ({ deleteEntry }) => {
  router.delete('/:id', function (req, res) {
    deleteEntry(req.params.id)
      .then(data => res.json(data))
  })
  return router;
}