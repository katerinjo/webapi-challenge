const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json({hello: "world", given: req.body});
});

function logger(req, res, next) {
  console.log('method:', req.method);
  console.log('url:', req.url);
  console.log('timestamp:', new Date().toTimeString());
  next();
};

module.exports = server;