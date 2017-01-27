var express = require('express');
var router = express.Router();
var UserSchema = require('../models/user.js');


router.post('/', function(req, res, next) {
    //this route will create a new user if it does not exist and returns the data about the user if the user exists. Also updates the user_token. Requires a user_id and user_token
    if (req.body.user_id && req.body.user_token) {
        UserSchema.findOneAndUpdate({user_id:req.body.user_id}, {user_token:req.body.user_token},{upsert:true, new:true, setDefaultsOnInsert: true}, function(err, user){
            if(err){
                res.status(500).send("MongoDB failure");
            }
            else{
                res.json({user});
            }
        });
    }
    else{
        res.status(401).send("Must send user_id and user_token");
    }
});

router.post('/points', function(req, res, next) {
    //this route will add/subtract points. requires boolean 'isAdd' for add/subtract and amount. Will return success code and new point value
});

router.post('/achievements', function(req, res, next) {
    //this route will add achievements. requires achievement_id
});

module.exports = router;
