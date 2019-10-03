// / code away!

// Imports
//  const express = require('express');
require('dotenv').config()
const server = require('./server.js');
 



server.get('/', (req, res) => {
    res.send(`<title>API'S-R-US</title>

    <h1>Welcome to my Api</h1>
    
    <ul>Endpoints Users
       <li> GET /api/users</li>
       <li> GET /api/users/:id</li>
       <li> GET /api/users/:id/posts</li>
       <li> POST /api/users/:id/posts</li>
       <li> PUT /api/users/:id</li>
       <li> DELETE /api/users/:id </li>
    
    </ul>
    
    <ul>Endpoints Posts
      <li>GET /api/posts</li>
      <li>GET /api/posts/:id</li>
      <li>PUT /api/posts/:id</li>
      <li>DELETE /api/posts/:id</li>
    </ul>`)
  })

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`\n*** Server is running on port ${port}  ***\n`)
})