const express = require('express');
const router = express.Router();
const User = require('../models/users');
const authorize = require('../authentication/middleware/authorize');
const bcrypt        = require('bcryptjs');

//get all users
router.get('/', authorize, (req,res) => {
    User.find({})
        .then(element =>{res.json(element);})
        .catch(err => res.status(500).json.err)
})
//register a new user
router.post('/', (req, res) => {
        let object = req.body

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                // Store hash in your password DB.
                if (err) throw err; 
            
        let newUser = User({
            firstName: object.firstName, 
            lastName: object.lastName, 
            username: object.username, 
            sm_link:object.sm_link, 
            social: {
                facebook: object.facebook,
                instagram: object.instagram,
                strava: object.strava
                  },
            blog: object.blog, 
            email: object.email, 
            men: object.men,
            women: object.women,
            password: hash
        })
        newUser.save()
            .then(element => {res.json(newUser)})
            .catch(err => {res.status(400).json({err})
            })
        });
    })
});


//get one specific user

router.get('/:user_id', (req,res) => {
    User.findById(req.params.user_id)
        .then(element => res.json(element))
        .catch(err => res.status(500).json(err))
});

//update a user 

router.put('/:user_id', authorize, (req,res) => {
    const updateData = req.body;
    User.findOneAndUpdate({_id: req.params.user_id}, updatedData)
        .then(updated => res.json(updated))
        .catch(err => res.status(500).json(err));
});

//delete a user
router.delete('/:user_id', authorize, (req,res) => {
    User.findOneAndRemove({_id: req.params.user_id })
         .then(deleted=> res.json(deleted))
        .catch(err => res.status(500).json(err));
})

module.exports = router;