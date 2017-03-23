const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');



router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password)
    User.find({username: username})
        .then(user => {
            console.log(user);
            bcrypt.compare(password, user[0].password, function(err,result){
                if(result){
                    let token = jwt.sign({username:username}, 'userkey');
                    console.log(token)
                    res.json({token:token,
                        user:user[0]});
                } else {
                    res.status(403).send({token:null});
                } 
            }) 
        })    
});
module.exports = router;