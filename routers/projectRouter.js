const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  db.insert(req.body);
  res.status(201).json({ accepted: req.body });
});

router.get('/:id', (req, res) => {
  const project = db.get(req.params.id);
  if (project.name) {
    res.status(200).json({ project });
  } else {
    res.status(404).json({ message: "no project with that id"});
  }
});

router.get('/', (req, res) => {
  db.get()
    .then(allProjects => {
      res.status(200).json({ projects: allProjects });
    })
    .catch(console.log);
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