// / code away!

// Imports
//  const express = require('express');
require('dotenv').config()
const server = require('./server.js');


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`)
  });

const port = process.env.PORT;
server.listen(port, () => {
  console.log('\n*** Server is running on port 5000 ***\n')
})