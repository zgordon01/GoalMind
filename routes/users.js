var express = require('express');
var router = express.Router();
var UserSchema = require('../models/user.js');


router.post('/', function(req, res, next) {//the only query that directly uses the auth0 user_id
    //this route will create a new user if it does not exist and returns the data about the user if the user exists. Also updates the user_token. Requires a user_id and user_token
    if (req.body.user_id && req.get("Authorization")) {
        UserSchema.findOneAndUpdate({user_id:req.body.user_id}, {user_token : req.get("Authorization")},{upsert:true, new:true, setDefaultsOnInsert: true}, function(err, user){
            if(err){
                res.sendStatus(500);
            }
            else{
                res.json(user);
            }
        });
    }
    else{
        res.sendStatus(401);
    }
});

router.post('/updateUser', function(req, res, next) {
    //this route will update user info. requires user_token and the values to be updated
    var query = {user_token : req.get("Authorization")};

    UserSchema.findOneAndUpdate(query, req.body.updates,{new : true}, function(err, user){
        if(err){
            res.sendStatus(500);
        }
        else{
            res.json(user);
        }
    });
});


router.post('/points', function(req, res, next) {
    //this route will add/subtract points. requires boolean 'isAdd' for add/subtract and amount. Will return success code and new point value
});

router.post('/achievements', function(req, res, next) {
    //this route will add achievements. requires achievement_id
});

module.exports = router;
