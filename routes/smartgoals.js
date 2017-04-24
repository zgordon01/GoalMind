var express = require('express');
var router = express.Router();
var moment = require('moment');
var SmartGoal = require('../models/smartgoal.js');
var UserSchema = require('../models/user.js');
var users = require('./users.js');
//var UserHistory = require('../models/user.js');
var realDate = moment();
realDate.format();

var date = realDate;
var currentWeek = moment(date).week();

//Variables to determine when the priority level goals max out their priority, for ordering
var daysToMaxMax = 3;
var daysToMaxHigh = 7;
var daysToMaxMedium = 10;
var daysToMaxLow = 14;
var daysToMaxBurner = 28;
//Max and min point values for priority goal settings
var maxPointsMax = 12;
var minPointsMax = 9
var maxPointsHigh = 10
var minPointsHigh = 7
var maxPointsMed = 8
var minPointsMed = 4
var maxPointsLow = 5
var minPointsLow = 2
var maxPointsBurn = 3
var minPointsBurn = 1;


router.route('/')

    .get(function(req, res) {
        SmartGoal.find(function(err, goals) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(goals);
        });
    });

router.route('/byuser')
    .post(function(req, res) {
        var query = {}
        var goal_type;
        query.user_id = res.locals.user_id;
        if (req.body.goal_type)
        {
          goal_type = req.body.goal_type;
          //console.log(query.goal_type);
        }

        SmartGoal.find(query, function(err, goals) {
            if (err) {
                res.status(500).send(err);
            } else {
                updateRepeats(goals);

                var query = {}
                query.user_id = res.locals.user_id;
                query.is_complete = false;
                if(goal_type)
                {
                  query.goal_type=goal_type;
                }

                SmartGoal.find(query, function(err, goals) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        updatePriorities(goals);
                        res.send(goals);
                    }
                });
            }
        });
    });

router.route('/byuser/history')
    .post(function(req, res) {
        var query = {}
        query.user_id = res.locals.user_id;
        query.is_complete = true;

        SmartGoal.find(query, function(err, goals) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(goals);
        });


    });
router.route('/byuser/pointshistory')
    .post(function(req, res) {
        var query = {}
        query.user_id = res.locals.user_id;
        query.is_complete = true;
        var dates = {};

        SmartGoal.find(query, function(err, goals) {
            if (err) {
                efds
                res.status(500).send(err);
            } else {
                goals.forEach(function(thisgoal) {
                    var newGoal = 0;
                    if (thisgoal.completed_at) {
                        thisgoal.completed_at.forEach(function(getDates) {
                            newGoal++;
                            shortDate = moment(getDates).format('YYYY/MM/DD');

                            if (dates[shortDate]) {
                                dates[shortDate]++;
                            } else {
                                dates[shortDate] = 1;
                                console.log("array: " + dates[shortDate]);
                                console.log(dates.findIndex)
                            };
                        });
                    };
                });
            }; //closes else

            res.json(dates);
        });
    });

router.route('/complete')
    .post(function(req, res, callback) {

        if (req.body.goal_id) {
            console.log("starting complete");
            var userObject;

            var response = {
                levelUp: false,
                demoted: false
            };
            UserSchema.find({
                user_token: req.get('Authorization')
            }, function(err, user) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    userObject = user;
                }
            });
            SmartGoal.findById(req.body.goal_id, function(err, goal) {
                if (err) {
                    res.status(500).send(err);
                }
                if (goal && !goal.is_complete) {
                    var realDate = moment();
                    var date = realDate.format();
                    var currentWeek = moment(date).week();

                    goal.completed_at.addToSet(date);

                    var pointsBuffer = Math.floor((Math.random() * (10 - 5)) + 5); //default, starting point value
                    if (goal.goal_type !== "REPEAT") {
                        //console.log("pointsbuffer starting with " + pointsBuffer);
                        if (goal.goal_type == "PRIORITY") {
                            switch (goal.user_priority) {
                                case 'BURN':
                                    pointsBuffer += Math.floor((Math.random() * (maxPointsBurn - minPointsBurn + 1))) + minPointsBurn;
                                    break;
                                case 'LOW':
                                    pointsBuffer += Math.floor((Math.random() * (maxPointsLow - minPointsLow + 1))) + minPointsLow;
                                    break;
                                case 'MEDIUM':
                                    pointsBuffer += Math.floor((Math.random() * (maxPointsMed - minPointsMed + 1))) + minPointsMed;
                                    break;
                                case 'HIGH':
                                    pointsBuffer += Math.floor((Math.random() * (maxPointsHigh - minPointsHigh + 1))) + minPointsHigh;
                                    break;
                                case 'MAX':
                                    pointsBuffer += Math.floor((Math.random() * (maxPointsMax - minPointsMax + 1))) + minPointsMax;
                                    break;
                                default:
                                    pointsBuffer = 5;
                            }
                        } else if (goal.goal_type = "DUEDATE") {
                            pointsBuffer += moment(goal.due_date).startOf('day').diff(moment().startOf('day')) >= 0 ? Math.floor((Math.random() * (7 - 4)) + 4) : -Math.floor((Math.random() * (5 - 1)) + 5);
                        }
                        //Set goal to complete
                        goal.is_complete = true;

                        //console.log("after the calcs pointsBuffer is " + pointsBuffer);


                        users.points(req, res, Math.floor(pointsBuffer), function(isLeveled, isDemoted, pointsAdded) {

                            response.levelUp = isLeveled;
                            response.demoted = isDemoted;
                            response.pointsAdded = pointsAdded;

                            //update points history here
                            goal.points_history.addToSet({date : date, points : pointsBuffer});
                            goal.save(function(err) {
                                if (err) {
                                    res.status(500).send(err.message);
                                } else {
                                    res.status(200).json(response);
                                }
                            });
                        });
                        //END OF IF NOT A REPEAT
                    } else {
                      var myGoals=[goal];
                        updateRepeats(myGoals);

                        if (goal.repeat_times == goal.times_this_week || goal.repeat_times < goal.times_this_week) {
                            goal.is_complete = true;
                            pointsBuffer += Math.floor((Math.random() * (5 - 2)) + 2);
                            //console.log("after the calcs pointsBuffer is " + pointsBuffer);
                            users.points(req, res, Math.floor(pointsBuffer), function(isLeveled, isDemoted, pointsAdded) {
                                response.levelUp = isLeveled;
                                response.demoted = isDemoted;
                                response.pointsAdded = pointsAdded;

                                goal.points_history.addToSet({date : date, points : pointsBuffer});
                                goal.save(function(err) {
                                    if (err) {
                                      console.log("nope");
                                        res.status(500).send(err.message);
                                    } else {
                                        res.status(200).json(response);
                                    }
                                });
                                //update points history here
                            });
                        } else {
                            goal.is_complete = false;

                            goal.points_history.addToSet({date : date, points : 0});
                            goal.save(function(err) {
                                if (err) {
                                    res.status(500).send(err.message);
                                } else {
                                    res.status(200).json(response);
                                }
                            });
                        }
                    }
                } //ends if goal is already complete
                else { //gets here if goal is already completed or does not exist
                    res.status(200).send();
                }
            });
        } else {
            res.status(400).send(); //goal id not passed
        }

    });
router.delete('/delete/', function(req, res) {
    if (req.body.goal_id) {
        if (req.body.goal_id != "deleteAll") {
            //console.log("in findbyid");
            SmartGoal.findById(req.body.goal_id)
                .exec(function(err, doc) {
                    if (err || !doc) {
                        res.statusCode = 404;
                        res.send({});
                    } else {
                        doc.remove(function(err) {
                            if (err) {
                                res.statusCode = 403;
                                res.send(err);

                            } else {
                                res.statusCode = 200;
                                res.send({
                                    message: "Goal Deleted"
                                });
                            }
                        });
                    }
                });
        } else {
            //console.log("in delete all");
            SmartGoal.remove({
                user_id: res.locals.user_id
            }, function(err) {
                if (err) {
                    res.status(500).send();
                }
                res.status(200).json({
                    allDeleted: true
                });
            });
        }
    } else {
        res.status(400).send();
    }
});

router.route('/').post(function(req, res) {
    var goal = new SmartGoal();
    if (req.body.title) {

        goal.title = req.body.title;

        if (req.body.notes) {
            goal.notes = req.body.notes;
        }
        if (req.body.repeat_times) {
            goal.repeat_times = req.body.repeat_times;
        }
        if (req.body.due_date) {
            goal.due_date = req.body.due_date;
        }
        goal.goal_type = req.body.goal_type;

        if (req.body.user_priority) {
            goal.user_priority = req.body.user_priority;
        }
        if (req.body.repeat_goal) {
          goal.repeat_goal= req.body.repeat_goal;
        }

        goal.is_complete = false;
        goal.times_this_week = 0;
        goal.times_today = 0;
        goal.over_due = false;
        goal.date_created = date;


        goal.user_id = res.locals.user_id;
        goal.save(function(err) {
            if (err) {
                console.log("ERR LINE 323 saving goal");
                res.status(500).send(err.message);
                //console.log(err.message);
            } else {
                res.json({
                    message: 'Created Goal'
                });
            }
        });
    } else {
        res.status(400).json({
            message: "Must send required parameters"
        });
    }

});
router.route('/update')
    .post(function(req, res) {
        SmartGoal.findById(req.body.goal_id, function(err, goal) {
            if (err) {
                res.status(500).send(err);
            }
            if (req.body.title)
                goal.title = req.body.title;

            goal.notes = req.body.notes;

            if (req.body.user_priority)
                goal.user_priority = req.body.user_priority;
            if (req.body.goal_type)
                goal.goal_type = req.body.goal_type;
            if (req.body.due_date)
                goal.due_date = req.body.due_date;
            if (req.body.repeat_times)
            {
              goal.repeat_times = req.body.repeat_times;

            }

            goal.user_id = res.locals.user_id;

            goal.save(function(err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                  var myGoals=[goal];
                    updateRepeats(myGoals);

                    res.json({
                        message: "Goal successfully updated."
                    });
                }
            });
        });
    });
router.route('/view')
    .post(function(req, res) {
        var query = {}
        query.user_id = res.locals.user_id;
        query._id = req.body.goal_id;

        SmartGoal.find(query, function(err, goal) {
            if (err) {
                console.log("ERROR");
                res.status(500).send(err);
            } else {
                console.log(goal[0]);
                res.send(goal[0]);


            }
        });
    });

updateRepeats = function(goals) {
    goals.forEach(function(goal) {
        var thisWeek = 0;
        var today= 0;
        if (goal.goal_type == "REPEAT") {
            goal.is_complete = false;

            var realDate = moment();
            realDate.format();
            var date = realDate;
            var currentWeek = moment(date).week();

            goal.completed_at.forEach(function(eachDate) {
                //console.log(eachDate);
                if (moment(eachDate).week() == currentWeek) {
                    thisWeek++;
                    if(moment(eachDate).day() == date.day())
                    {
                      today++;
                    }
                    //console.log("foundone");
                }
            });
            goal.times_this_week = thisWeek;
            goal.times_today = today;
            if (goal.repeat_times == thisWeek || goal.repeat_times < thisWeek) {
                goal.is_complete = true;
            } else {
                goal.is_complete = false;
            }
            goal.save(function(err) {
                if (err) {
                    //res.status(500).send(err.message);
                } else {
                    //console.log(goal);
                    //res.status(200).json({message: "Goal updated"});
                }
            });
        }
    });
}
updatePriorities = function(goals) {
    goals.forEach(function(goal) {
        if (goal.goal_type == 'DUEDATE') {
            var dueDate = moment(goal.due_date);
            var date = moment();
            var daysAway = dueDate.diff(date, 'days');
            //console.log(goal.title + ": days til due: " + daysAway);
            goal.urgency_level = daysAway + 1;
            if (daysAway < 0) {
                goal.urgency_level = -1;
                goal.over_due = true;
            }
            goal.save(function(err) {
                if (err) {
                    //res.status(500).send(err.message);
                } else {
                    //console.log(goal);
                    //res.status(200).json({message: "Goal updated"});
                }
            });
        } else if (goal.goal_type == 'PRIORITY') {
            var date = moment();
            var dateMade = moment(goal.date_created);
            var daysAgo = dateMade.diff(date, 'days');
            if (goal.user_priority == "BURN") {
                goal.urgency_level = (daysToMaxBurner - daysAgo);
                if (goal.urgency_level < 0) {
                    goal.urgency_level = 0;
                }
            } else if (goal.user_priority == "LOW") {
                goal.urgency_level = (daysToMaxLow - daysAgo);
                if (goal.urgency_level < 0) {
                    goal.urgency_level = 0;
                }
            } else if (goal.user_priority == "MEDIUM") {
                goal.urgency_level = (daysToMaxMedium - daysAgo);
                if (goal.urgency_level < 0) {
                    goal.urgency_level = 0;
                }
            } else if (goal.user_priority == "HIGH") { //HIGH
                goal.urgency_level = (daysToMaxHigh - daysAgo);
                if (goal.urgency_level < 0) {
                    goal.urgency_level = 0;
                }
            }
            if (goal.user_priority == "MAX") {
                goal.urgency_level = (daysToMaxMax - daysAgo);
                if (goal.urgency_level < 0) {
                    goal.urgency_level = 0;
                }
            }
            goal.save(function(err) {
                if (err) {
                    //res.status(500).send(err.message);
                } else {
                    //console.log(goal);
                    //res.status(200).json({message: "Goal updated"});
                }
            });
        } else if (goal.goal_type == 'REPEAT') {
            var completesRemaining = (goal.repeat_times - goal.times_this_week);
            var date = moment();
            var dayOfWeek = date.day();
            var daysLeft = (7 - dayOfWeek);
            var freeDays = daysLeft - completesRemaining;
            if (goal.times_today>0)
            {
              freeDays-=1;
            }
            goal.urgency_level = freeDays * 1.5;

            if (goal.urgency_level < 0) {
                goal.urgency_level = -1;
            }
            goal.save(function(err) {
                if (err) {
                    //res.status(500).send(err.message);
                } else {
                    //console.log(goal);
                    //res.status(200).json({message: "Goal updated"});
                }
            });
        }
    });
}


module.exports = router;
