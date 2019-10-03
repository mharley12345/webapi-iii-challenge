const express = require('express');
const User = require('./userDb.js')
const router = express.Router();






router.post('/', (req, res) => {
     const body = req.body
     console.log("this is my body")
    User.insert(body)
    
    .then(users =>{
        res.status(201).json({newUser: users})
    })
    
    .catch(error =>{
        console.log(error)
    res.status(500).json({message:"Error Adding User"})
    })
})


router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    //  const userId = req.params.id;
    const body = req.body;
    body.user_id = req.params.id;
    // console.log(body)
    User.insert(body)
    .then(user => {
        res.status(201).json(user)    
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding the user' })
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
    // store req.params.id
    const id = req.params.id;

    User.getById(id)
    .then(user => {
        if(!user) {
            res.status(404).json({ errorMessage: "That is not a valid id/user" })
        }
        // create new key/val pair inside our user
        req.user = user;
        // if that doesn;t work > go to next Middle Ware
        next();
    })
    .catch( err => {
        res.status(400).json({ errorMessage: 'invalid user id'})
    })
};

function validateUser(req, res, next) {
    const body = req.body
    if (!body){
        res.status(400).json({message: 'Missing user data'})
    }else if (!body.name){
        res.status(400).json({message:'User name required'})
    }else{
        next()
    }
};

function validatePost(req, res, next) {
    // Need - req.body & body.text
    const body = req.body;
    const text = req.body.text;

    if(!body) {
        res.status(400).json({ errorMessage: "Please add something to your post" })
    } else if(!text) {
        res.status(400).json({ errorMessage: "Please add text" })
    } else {
        // move to next middleware
        next();
    }
};
module.exports = router;
