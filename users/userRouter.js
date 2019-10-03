// Imports
const express = require('express');
const UsersDB = require('./userDb.js');
const PostsDB = require('../posts/postDb.js');
// Ensure our router is using Express
const router = express.Router();
router.post('/', validateUser, (req, res) => {
    const body = req.body;
    console.log('This is the body', body)
    UsersDB.insert(body)
    .then(user => {
        res.status(201).json({ newUser: user })
    })
    .catch(err => {
        res.status(500).json({ message: 'Could not add user' })
    })
});
/*
validateUserId validates the user id on every request that expects a user id parameter
if the id parameter is valid, store that user object as req.user
if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }
getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
insert(): calling insert passing it a resource object will add it to the database and return the new resource.
 */
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    // const userId = req.params.id;
    const body = req.body;
    body.user_id = req.params.id;
    
    PostsDB.insert(body)
    .then(user => {
        res.status(201).json({ newUser: user })    
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding the user' })
    })
});
router.get('/', (req, res) => {
    UsersDB.get()
    .then(user => {
        res.status(200).json({ users: user })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Error retrieving users from the DB' })
    })
});
router.get('/:id', validateUserId, (req, res) => {
    res.status(201).json({ user: req.user })
});
// Need validateUserID
router.get('/:id/posts', validateUserId, (req, res) => {
    UsersDB.getUserPosts(req.params.id)
    .then(post => {
        res.status(200).json({ allPosts: post })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error retrieving the list of users. "})
    })
});
// Need validateUserID
router.delete('/:id', validateUserId, (req, res) => {
    UsersDB.remove(req.params.id)
    .then(() => {
        res.status(200).json({ deleteduser: req.user})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "An error occured while trying to delete the user." })
    })
});
// Need validateUserID & validateUser
router.put('/:id', validateUser, validateUserId, (req, res) => {
    UsersDB.update(req.params.id, req.body)
    .then(() => {
        UsersDB.getById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "An Error occured while updating the username OR that name is already taken, please try another name." })
    })
});
//custom middleware
function validateUserId(req, res, next) {
    // store req.params.id
    const id = req.params.id;
    UsersDB.getById(id)
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
    const body = req.body;
    const bodyName = req.body.name;
    
    if(!body) {
        res.status(400).json({ errorMessage: "missing user data" })
    } else if(!bodyName) {
        res.status(400).json({ errorMessage: "Please add a name." })
    } else {
        // move to the next MW function
        next();
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