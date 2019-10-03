const express = require('express');
const UsersDB = require('../users/userDb.js')
const PostsDB = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    PostsDB.get()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err =>{
        res.status(500).json({errorMessage:`${err}`})
    })
});

router.get('/:id',validatePostId, (req, res) => {
    PostsDB.getById(req.params.id)
    .then(post =>{
        res.status(200).json({Posts: post})
    })
    .catch(err =>{
        res.status(500).json({errorMessage: `${err}`})
    })
});

router.delete('/:id',validatePostId, (req, res) => {
       PostsDB.remove(req.params.id)
       .then(() =>{
           res.status(200).json({Post_Deleted: req.params.id.posts})
       })
       .catch(err =>{
           res.status(500).json({errorMessage: `${err}`})
       })
});

router.put('/:id',validatePostId, (req, res) => {
         PostsDB.update(req.params.id, req.body)
         .then(()=>{
             PostsDB.getById(req.params.id)
             .then(post =>{
                 res.status(200).json(post)
             })
         })
         .catch(err =>{
             res.status(500).json({errorMessage: `${err}`})
         })
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id
  PostsDB.getById(id)
  .then(posts => {
      if (!posts){
          res.status(404).json({errorMessage:"Invalid post id"})
      }
      //create new key/val pair
      req.posts = posts
      next()
  })
  .catch(error =>{
      res.status(400).json({errorMessage:`${error}`})
  })
};

module.exports = router;