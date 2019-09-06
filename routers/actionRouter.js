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
  db.get(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json({ action });
      } else {
        res.status(404).json({ message: "no action with that id"});
      }
    })
    .catch(err => {
      console.log(err);
      this.res.status(500).json({ message: "internal error" });
    });
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(updated => {
      if (updated) {
        res.status(202).json({ updated });
      } else {
        res.status(404).json({ message: "no action with that id" });
      }
    })
    .catch(err => {
      console.log(err);
      this.res.status(500).json({ message: "internal error" });
    });
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