const express = require('express');
const router = express.Router();
const User=require("../../model/User");
const ValidateRegistrationInput=require("../../validation/Register");
const ValidateLoginInput=require("../../validation/Login");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys=require("../../config/keys");
/*
    @route  api/users/Register
    @desc   Register Users
    @access public
*/
router.post('/register', (req, res) => {
const {errors,isValid}= ValidateRegistrationInput(req.body);
if (!isValid) {
    return res.status(400).json(errors)
}
User  .findOne({email:req.body.email })
      .then(user => {
        if (user) {
             return res.status(400).json({ email: 'Email already exists' });
        }
        const newUser = new User({
         username : req.body.username,
         email : req.body.email,
         password: req.body.password
        });
        //ENCRYPT THE PASSWORD
            bcrypt.genSalt(10, (_err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json(user);
                  });
              });
            });
      
      })
});
/*
    @route  api/users/login
    @desc  LOGIN USERS
    @access public
*/
router.post('/login', (req, res) => {
    const {errors,isValid}= ValidateLoginInput(req.body);
    if (!isValid) {
    return res.status(400).json(errors);
    }
    const email=req.body.email;
    const password=req.body.password;
    
    User  .findOne({email })
          .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'Email does not exist' });
            }
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                  const payload={
                      id:user._id,
                      username:user.username,
                      role:user.role,
                      joined:user.joined
                  };
                  jwt.sign(payload,
                    keys.secretOrKey,
                    {expiresIn: 31556926},
                    (_err, token) => {
                        res.json({
                          success: true,
                          token: "Bearer " + token
                        });
                      }
                   
               
            );
                      }  else{
                    return res.status(400).json({ password: 'Password is Incorrect' });
                }
            });
          });
});

module.exports = router;