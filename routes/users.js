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

router.post('/achievements', function(req, res, next) {//make function?
    //this route will add achievements. requires achievement_id
});

router.points = function(req, res, points, callback){//returns if the user leveled up or not (boolean)
    if(points){
        var query = {user_token : req.get("Authorization")};
        pointsBuffer = parseInt(points, 10);
        UserSchema.findOneAndUpdate(query, {$inc:{points:pointsBuffer}}, {new:true}, function(err, user){
            if(err){
                callback(false);
            }
            else{
                determineLevel(req,res,user.points, function(leveled, demoted){
                    console.log("in pipeline we have " + leveled);
                    callback(leveled, demoted, points);
                });
            }
        });

    }
    else{
        callback(false);
    }
}
function determineLevel(req, res, points, callback){
    var playerLevel = 1;
    var lastThreshold = 0;
    var levelThreshold = 10;//level2
    var levelMultiplier = 1.15;
    var levelConstant = 10;
    while(points > Math.floor(levelThreshold)){
        lastThreshold = levelThreshold;
        var nextThreshold = (levelConstant*levelMultiplier);
        levelThreshold = lastThreshold+nextThreshold;
        levelMultiplier += .5;
        levelConstant += .5;
        playerLevel++;
        console.log("player level: "+playerLevel);
        console.log("level threshold: "+levelThreshold);
        //console.log("increase in difficulty: " + (levelThreshold-last));

    }
    UserSchema.findOneAndUpdate({user_token : req.get("Authorization")}, {pointsToNext:Math.floor((levelThreshold-points)), level:playerLevel}, {new:false}, function(err, user){
        if(err){
            res.status(500);
        }
        else{
            callback(playerLevel > user.level, playerLevel < user.level);
        }
    });
}

module.exports = router;
