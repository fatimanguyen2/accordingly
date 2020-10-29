const express = require('express');
const router = express.Router();




module.exports = ({ deleteEntry }) => {

  router.delete('/:id', function (req, res) {
    deleteEntry(req.params.id)
      .then(data => res.json(`Sucessfully updated entry : id '${data.id} '${data.title}' to be inactive`))
  })

  router.put('/:id', function (req, res) {

  })

  return router;
}