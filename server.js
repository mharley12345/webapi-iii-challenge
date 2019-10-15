// GOTCHA require* was needed
// Imports
const express = require('express');
const cors = require('cors')
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
// Create our server
const server = express();
server.use(cors())
server.use(express.json());

// use Methods
 server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)
// custom middleware
// logger logs to the console the following information about each request: request method, request url, and a      timestamp
// this middleware runs on every request made to the API
function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();
  console.log(`a ${method} request to ${url} was made at ${time} o'clock.`)
  next()
};


module.exports = server;