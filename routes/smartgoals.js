
var express =require('express');
var router = express.Router();
var moment = require('moment');
var SmartGoal = require('../models/smartgoal.js');

//This is how many weeks you want to jump ahead when using testDate
var addWeeks=9;

var realDate = moment();
var testDate = moment().add(addWeeks, 'week');
realDate.format();
testDate.format();

//Set to realDate or testDate if you want to jump ahead in time for testing, you will have to go through the code and change all
//var date=testDate to var date=realDate, or vice versa. control (or command on mac) + f is useful
var date = realDate;

var currentWeek = moment(date).week();


router.route('/')

	.get(function(req, res) {
		SmartGoal.find(function(err, goals) {
			if (err){
				res.status(500).send(err);
			}
			res.json(goals);
		});
});

router.route('/byuser')
	.post(function(req, res) {
		var query = {}
		query.user_id = res.locals.user_id;

		SmartGoal.find(query, function (err, goals) {
			if (err)
			{
				res.status(500).send(err);
			}
			else{

				goals.forEach(function (goal)
				{
					var thisWeek=0;
					if(goal.goal_type == "REPEAT")
					{
						goal.complete=false;

						var realDate = moment();
						var testDate = moment().add(addWeeks, 'week');
						realDate.format();
						testDate.format();
						var date = realDate;
						var currentWeek = moment(date).week();

						goal.completeDates.forEach(function (eachDate)
						{
							console.log(eachDate);
							if (moment(eachDate).week() == currentWeek)
							{
								thisWeek++;
								//console.log("foundone");
							}
						});
						goal.completesThisWeek=thisWeek;
						if(goal.repeat == thisWeek || goal.repeat <thisWeek)
						{
							goal.complete=true;
						}
						else {
							goal.complete=false;
						}
						goal.save(function(err) {
							if (err)
							{
								//res.status(500).send(err.message);
							}
							else {
								//console.log(goal);
								//res.status(200).json({message: "Goal updated"});
							}
						});
					}
				});
			}
				var query = {}
				query.user_id = res.locals.user_id;
				query.complete = false;
				SmartGoal.find(query, function (err, goals) {
					if (err)
					{
						res.status(500).send(err);
					}
					else {
						res.send(goals);
					}
			});
		});
	});

	router.route('/byuser/history')
		.post(function(req, res) {
			var query = {}
			query.user_id = res.locals.user_id;
			query.complete = true;

			SmartGoal.find(query, function (err, goals) {
				if (err)
				{
					res.status(500).send(err);
				}
				res.json(goals);
			});


		});

router.route('/complete')
.post(function(req, res) {
	SmartGoal.findById(req.body.goal_id, function(err, goal) {
		if (err)
		{
			res.status(500).send(err);
		}
		//console.log("===================================");
			goal.complete=false;
			var realDate = moment();
			var testDate = moment().add(addWeeks, 'week');
			realDate.format();
			testDate.format();
			var date = realDate;
			var currentWeek = moment(date).week();
			goal.completeDates.addToSet(date.format());
			//console.log("adding to set: " + date.format());
			//console.log("for goal: " + goal._id);
			if(goal.goal_type !== "REPEAT")
			{
				goal.complete=true;
				/*
				CODE HERE FOR GIVING USER points
				THIS IS WHEN THEY HAVE COMPLETED THEIR NON REPEATING GOAL
				*/
			}
			else {
				var thisWeek=0;
				goal.complete=false;

				goal.completeDates.forEach(function (eachDate)
				{
					//console.log("current : " + currentWeek);
					//console.log("goal: " + moment(eachDate).week());

					if (moment(eachDate).week() == currentWeek)
					{
						thisWeek++;
						//console.log("found a match this week");
					}
				});
				goal.completesThisWeek=thisWeek;
				if(goal.repeat == thisWeek || goal.repeat < thisWeek)
				{
					goal.complete=true;
					/* CODE FOR GIVING USER POINTS */
					/* THIS IS WHEN THEY HAVE COMPLETED THEIR SET AMOUNT OF REPEATS PER WEEK */
				}
				else
				{
					goal.complete=false;
				}
			}
		goal.save(function(err) {
			if (err)
			{
				res.status(500).send(err.message);
			}
			else {
				//console.log(goal);
				res.status(200).json({message: "Goal Complete!"});
			}
		});
	});
});
router.delete('/delete/:goal_id', function(req,res) {
	SmartGoal.findById(req.params.goal_id)
		.exec(function(err, doc) {
			if (err || !doc){
				res.statusCode = 404;
				res.send({});
			}else {
				doc.remove(function(err) {
					if(err) {
						res.statusCode=403;
						res.send(err);

					}else {
						res.statusCode=200;
						res.send({message: "Goal Deleted"});
					}
				})
			}
		})
	});

router.route('/')

    .post(function(req, res) {
        var goal = new SmartGoal();
        if (req.body.title && req.body.goal_type) {
						if (req.body.notes)
						{
							goal.notes = req.body.notes;
						}
            if (req.body.repeat) {
                goal.repeat = req.body.repeat;
            }
            if (req.body.due_date) {
                goal.due_date = req.body.due_date;
            }
            goal.title = req.body.title;
            goal.goal_type = req.body.goal_type;

							if(req.body.priority)
							{
								goal.priority=req.body.priority;
							}

            goal.complete = false;
						goal.completesThisWeek = 0;

			goal.user_id = res.locals.user_id;
					console.log(goal);
            goal.save(function(err) {
                if (err) {
                    res.status(500).send(err.message);
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
			if (err)
			{
				res.status(500).send(err);
			}
			if(req.body.title)
				goal.title = req.body.title;
			if(req.body.description)
	    		goal.description = req.body.description;
			if(req.body.difficulty)
	    		goal.difficulty = req.body.difficulty;
			if(req.body.goal_type)
				goal.goal_type = req.body.goal_type;
			if(req.body.due_date)
				goal.due_date = req.body.due_date;
			if(req.body.repeat)
				goal.repeat = req.body.repeat;

			goal.user_id = res.locals.user_id;

			goal.save(function(err) {
				if (err)
				{
					res.status(500).send(err.message);
				}
				else {
					res.json({message: "Goal successfully updated."});
				}
			});
		});
	});
	router.route('/view')
        .post(function(req, res) {
            if (req.body.goal_id) {
                SmartGoal.findById(req.body.goal_id, function(err, goal) {
                    if (err) {
                        res.status(500).send(err);
                    } else {

                      res.json(goal);
                    }
                });
            } else {
                res.sendStatus(400);
            }
        });

module.exports = router;
