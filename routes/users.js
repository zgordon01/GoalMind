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


//router.post('/points', function(req, res, next){
//this route will add/subtract points. requires boolean 'isSubtract' for add/subtract and points property. Will return success code and new point user object
//    test(req,res,next);
//});

router.post('/achievements', function(req, res, next) {//make function?
    //this route will add achievements. requires achievement_id
});

router.points = function(req, res, points){//returns if the user leveled up or not (boolean)
    if(points){
        var query = {user_token : req.get("Authorization")};
        pointsBuffer = parseInt(points, 10);
        console.log("about to hit the real update with " + pointsBuffer);
        UserSchema.findOneAndUpdate(query, {$inc:{points:pointsBuffer}}, {new:true}, function(err, user){
            if(err){
                return false;
            }
            else{
                return determineLevel(req, res, user.points);
                //return true;
            }
        });

    }
    else{
        return false;
    }
}
function determineLevel(req, res, points){//PUT POINTS REMAINING UNTIL NEXT LEVEL IN USER OBJECT(done)
    console.log("in determineLevel with " + points + " points");
    var playerLevel = 1;
    var levelThreshold = 10;
    var levelMultiplier = 1.35;
    do{
        console.log("points is " + points + " and thresh is " + levelThreshold);
        console.log("at level " + playerLevel + " with " + points + " points");
        levelThreshold *= levelMultiplier;
        playerLevel++;
    }while(points > levelThreshold);
    UserSchema.findOneAndUpdate({user_token : req.get("Authorization")}, {pointsToNext:(levelThreshold-points), level:playerLevel}, {new:false}, function(err, user){
        if(err){
            res.status(500);
        }
        else{
            console.log("player leveled up " + playerLevel > user.level);
            //return playerLevel > user.level;
            return {leveled : true, newLevel : playerLevel};
        }
    });
    return {leveled : false};
}

module.exports = router;
