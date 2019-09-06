const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', validateAction, (req, res) => {
  db.insert(req.body)
    .then(dbRes => {
      console.log(dbRes);
      res.status(201).json({ accepted: req.body });
    })
    .catch(err => {
      console.log(err);
      this.res.status(500).json({ message: "internal error" });
    });
});

router.get('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

function validateAction(req, res, next) {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: "missing action data" });
  } else if (!action.description) {
    res.status(400).json({ message: "missing required description field"});
  } else if (action.description > 128) {
    res.status(400).json({ message: "description is too long"});
  } else if (!action.notes) {
    res.status(400).json({ message: "missing required notes field"});
  } else {
    db.get()
      .then(gotten => {
        if (gotten) {
          next();
        } else {
          res.status(400).json({ message: "invalid project_id"});
        }
      })
      .catch(err => {
        console.log(err);
        this.res.status(500).json({ message: "internal error" });
      });
  }
};

module.exports = router;