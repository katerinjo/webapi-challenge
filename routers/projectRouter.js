const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/', (req, res) => {
  const allProjects = db.get();
  res.status(200).json({ projects: allProjects });
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