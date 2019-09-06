const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  db.insert(req.body)
    .then(dbRes => {
      console.log(dbRes);
      res.status(201).json({ accepted: req.body });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json({ project });
      } else {
        res.status(404).json({ message: "no project with that id"});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(allProjects => {
      res.status(200).json({ projects: allProjects });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.get('/:id/actions', (req, res) => {

});


function validateProject(req, res, next) {
  const proj = req.body;
  if (!proj) {
    res.status(400).json({ message: "missing project data" });
  } else if (!proj.name) {
    res.status(400).json({ message: "missing required name field"});
  } else if (!proj.description) {
    res.status(400).json({ message: "missing required description field"})
  } else {
    next();
  }
};

module.exports = router;