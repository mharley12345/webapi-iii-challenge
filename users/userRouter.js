const express = require('express');

const router = express.Router();

const User = require('./userDb')





router.post('/', (req, res) => {
    User.insert(req.body)

    .then(user =>{
        res.status(201).json(user)
    })
    
    .catch(error =>{
        console.log(error)
    res.status(500).json({message:"Error Adding User"}
    )
    })
})


router.post('/:id/posts', (req, res) => {
    User.insert(req.body)
    .then(posts =>{
       res.status(201).json(posts)
    })
    .catch(error =>{
       console.log(error,'Posting ');
       res.status(500).json({
           message:'Error posting '
    })
})
});

router.get('/', (req, res) => {
     User.get(req.query)
     .then(user =>{
         res.status(200).json(user)
     })
});

router.get('/:id', (req, res,next) => {
     User.getById(req.params.id)
     .then(user =>{
         if(user){
             res.status(200).json(user)
         }else{
             res.status(404).json({message:'User not found'})
         }
     })
     .catch(error =>{
         console.log(error)
     })
});

router.get('/:id/posts', (req, res) => {
      User.getUserPosts(req.params.id)
      .then(posts =>{
          res.status(200).json(posts)
      })
      .catch(error =>{console.log(error)})
});

router.delete('/:id', (req, res) => {
           User.remove(req.params.id)
           .then(count =>{
               if(count > 0){
                   res.status(200).json({message:'The User Has Been Deleted'})
               }else{
                   res.status(404).json({message:'The User Could Not Be Found'})
               }
           })
           .catch(error =>{
               console.log(error);
               res.status(500).json({
                   message: 'Error Removing The User'
               })
           })
});

router.put('/:id', (req, res) => {
    
});

// custom middleware

function validateUserId(req, res, next) {
  const id = req.id 
if ( id === req.param.id){
    
  console.log('yes')
}else{
    router.status(400)
    console.log('No')
}
  console.log(req.params.id)
next()
}

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
