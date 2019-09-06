const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateAction, (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

function validateAction(req, res, next) {
  next();
};

module.exports = router;