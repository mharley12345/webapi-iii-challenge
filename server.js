const express = require('express');

const userRouter = require('./users/userRouter')
const server = express();

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
 const method = req.method
 const url = req.url
 const time = new Date().toISOString()
 console.log(`a ${method} request to ${url} was made @ ${time}`)
 next()
};


server.use('/api/users',userRouter)


module.exports = server;
