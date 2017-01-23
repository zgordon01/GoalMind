var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('../models/user.js');


router.post('/', function(req, res, next) {
    //this route will create a new user if it does not exist and returns the data about the user if the user exists. Also updates the user_token. Requires a user_id and user_token
    if (req.body.user_id && req.body.user_token) {
        res.setHeader('Content-Type', 'application/json');
        UserSchema.findOneAndUpdate({user_id:req.body.user_id}, {user_token:req.body.user_token},{upsert:true, new:true}, function(err, user){
          if(err){
            res.json({success:false});
          }
          else{
            res.json({success:true, user});
          }
        });
    }
    else{
      res.json({success:false});
    }
});

router.post('/points', function(req, res, next) {
    //this route will add/subtract points. requires boolean for add or subtract and amount
    res.setHeader('Content-Type', 'application/json');
});

router.post('/achievements', function(req, res, next) {
    //this route will add/subtract achievements. requires boolean for add/subtract and an achievement id
    res.setHeader('Content-Type', 'application/json');
});

module.exports = router;
